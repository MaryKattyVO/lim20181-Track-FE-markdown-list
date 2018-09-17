const mdlinks = require('../index');

let options = {
    validate: false,
    stats: false
};

describe('mdlinks', () => {
    test('Deberia verificar una función', () => {
        expect(typeof mdlinks).toEqual('function');
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
        return expect(mdlinks('Readme.md', options)).toBeInstanceOf(Promise);
    })
    test ('Deberia permitir ingresar una ruta y mostrar ruta, link y nombre del link',(done) => {
        options.stats = false;
        options.validate = false;
        return mdlinks('Readme.md',options)
        .then(data => {
            console.log(data);
            expect(data).toEqual([{"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}]);
            done();
        })
    })
    test('Deberia ingresar una ruta y obtener los links "md-links Readme.md  --stats --validate"', (done) => { 
        options.stats = true;
        options.validate = true;
        return mdlinks('Readme.md', options) 
        .then(data=>{
            console.log(data);
            expect(data).toEqual([{"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"broken": 6, "total": 12, "unique": 0}]);
            done();
        })
    });
    test('Deberia ingresar una ruta para la opcion --stats y mostrar total y unicos links', (done) => {
        options.stats = true;
        options.validate = false;
        return mdlinks('Readme.md', options)
        .then(data => {
            console.log(data);
            expect(data).toEqual([{"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://algo.com/2/3/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"file": "Readme.md", "href": "http://google.com/", "text": ""}, {"broken": 6, "total": 12, "unique": 0}, {"total": 16, "unique": 0}]);
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