const mdlinks = require('../index');

let options = {
    validate: false,
    stats: false
};
describe('mdlinks', () => {
    test('Deberia verificar una función', () => {
        expect(typeof mdlinks).toBe('function');
    });
    
    test('Deberia retornar un arreglo vacio si no encuentra un archivo con extensión .Md', (done) => {
        options.validate = false;
        options.stats = false;

        mdlinks('test.txt', options)
        .then((data) => {
            expect(JSON.stringify(data)).toEqual('[]');
            done();
        })
    });

    test('Deberia retornar una instancia de promesa', () => {
        return expect(mdlinks('testsEjemplo.md', options)).toBeInstanceOf(Promise);
    })
    test ('Deberia permitir ingresar una ruta archivo y mostrar ruta, link y nombre del link',(done) => {
        return mdlinks('testsEjemplo.md',options)
        .then(data => {
            expect(data).toEqual([{"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}]);
            done();
        })
    });
    test ('Deberia permitir ingresar una ruta archivo y mostrar --stats',(done) => {
        options.validate = false;
        options.stats = true;
        return mdlinks('testsEjemplo.md',options)
        .then(data => {
            expect(data).toEqual([{"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"total": 3, "unique": 0}]);
            done();
        })
    });
    test ('Deberia permitir ingresar una ruta archivo  y mostrar --validate',(done) => {
        options.validate = true;
        options.stats = false;
        return mdlinks('testsEjemplo.md',options)
        .then(data => {
            expect(data).toEqual([{"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"total": 3, "unique": 0}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}]);
            done();
        })
    });
    test ('Deberia permitir ingresar una ruta archivo y mostrar --validate -stats',(done) => {
        options.validate = true;
        options.stats = false;
        return mdlinks('testsEjemplo.md',options)
        .then(data => {
            expect(data).toEqual([{"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"total": 3, "unique": 0}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}]);
            done();
        })
    });
    test ('Deberia permitir ingresar una ruta Directorio y mostrar mostrar ruta, link y nombre del link ',(done) => {
        options.validate = false;
        options.stats = false;
        return mdlinks('exampleTests',options)
        .then(data => {
            expect(data).toEqual([{"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"total": 3, "unique": 0}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}, {"file": "exampleTests/exampleMD/testReadmeDos.md", "href": "https://developers.google.com/v8/", "text": "motor de JavaScript V8 de Chrome"}]);
            done();
        })
    });
    test ('Deberia permitir ingresar una ruta Directorio y mostrar mostrar --stats',(done) => {
        options.validate = false;
        options.stats = true;
        return mdlinks('exampleTests',options)
        .then(data => {
            expect(data).toEqual([{"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"total": 3, "unique": 0}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}, {"file": "exampleTests/exampleMD/testReadmeDos.md", "href": "https://developers.google.com/v8/", "text": "motor de JavaScript V8 de Chrome"}, {"total": 7, "unique": 0}]);
            done();
        })
    });
    test ('Deberia permitir ingresar una ruta Directorio y mostrar mostrar --validate',(done) => {
        options.validate = true;
        options.stats = false;
        return mdlinks('exampleTests',options)
        .then(data => {
            expect(data).toEqual([{"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"total": 3, "unique": 0}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}, {"file": "exampleTests/exampleMD/testReadmeDos.md", "href": "https://developers.google.com/v8/", "text": "motor de JavaScript V8 de Chrome"}, {"total": 7, "unique": 0}, {"file": "exampleTests/exampleMD/testReadmeDos.md", "href": "https://developers.google.com/v8/", "status": "OK", "text": "motor de JavaScript V8 de Chrome"}]);
            done();
        })
    });
    test ('Deberia permitir ingresar una ruta Directorio y mostrar mostrar --validate --stats',(done) => {
        options.validate = true;
        options.stats = true;
        return mdlinks('exampleTests',options)
        .then(data => {
            expect(data).toEqual([{"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"total": 3, "unique": 0}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}, {"file": "testsEjemplo.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": "OK", "text": "Markdown"}, {"file": "exampleTests/exampleMD/testReadmeDos.md", "href": "https://developers.google.com/v8/", "text": "motor de JavaScript V8 de Chrome"}, {"total": 7, "unique": 0}, {"file": "exampleTests/exampleMD/testReadmeDos.md", "href": "https://developers.google.com/v8/", "status": "OK", "text": "motor de JavaScript V8 de Chrome"}, {"broken": 0, "total": 9, "unique": 0}]);
            done();
        })
    });
    test('Deberia permitir ingresar una ruta para la opcion --validate y mostrar file, href, status y textLink', (done) => {
        options.stats = false;
        options.validate = true;
        return mdlinks('Readme.md', options)
        .then(data => {
            console.log(data);
            expect(data).toEqual([{"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file":
            "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"broken": 6, "total": 12, "unique": 0}, {"total": 16, "unique": 0}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "status": "Not Found", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "status": "Not Found", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "status": "OK", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "status": "OK", "text": ""}]);
        })
    })
}) 