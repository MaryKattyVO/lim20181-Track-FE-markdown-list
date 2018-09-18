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

        mdlinks('exampleTests/test.txt', options)
            .then((data) => {
                expect(JSON.stringify(data)).toEqual('[]');
                done();
            })
    });

    test('Deberia retornar una instancia de promesa', () => {
        return expect(mdlinks('exampleTests/example.md', options)).toBeInstanceOf(Promise);
    })
    test('Deberia permitir ingresar una ruta archivo y mostrar ruta, link y nombre del link', (done) => {
        return mdlinks('exampleTests/example.md', options)
            .then(data => {
                expect(data[0].file).toEqual('exampleTests/example.md');
                expect(data[0].href).toEqual('https://developers.google.com/v8/');
                expect(data[0].text).toEqual('motor de JavaScript V8 de Chrome');
                done();
            })
    });
    test('Deberia permitir ingresar una ruta archivo y mostrar --stats', (done) => {
        options.validate = false;
        options.stats = true;
        return mdlinks('exampleTests/example.md', options)
            .then(data => {
                console.log(data);
                expect(data[0].file).toEqual('exampleTests/example.md');
                expect(data[0].href).toEqual('https://developers.google.com/v8/');
                expect(data[0].text).toEqual('motor de JavaScript V8 de Chrome');
                done();
            })
    });
    test('Deberia permitir ingresar una ruta archivo  y mostrar --validate', (done) => {
        options.validate = true;
        options.stats = false;
        return mdlinks('exampleTests/example.md', options)
            .then(data => {
                expect(data[0].file).toEqual('exampleTests/example.md');
                expect(data[0].href).toEqual('https://developers.google.com/v8/');
                expect(data[0].text).toEqual('motor de JavaScript V8 de Chrome');
                done();
            })
    });
    test('Deberia permitir ingresar una ruta archivo y mostrar --validate -stats', (done) => {
        options.validate = true;
        options.stats = false;
        return mdlinks('exampleTests/example.md', options)
            .then(data => {
                expect(data[0].file).toEqual('exampleTests/example.md');
                expect(data[0].href).toEqual('https://developers.google.com/v8/');
                expect(data[0].text).toEqual('motor de JavaScript V8 de Chrome');
                done();
            })
    });
    test('Deberia permitir ingresar una ruta Directorio y mostrar ruta, link y nombre del link ', (done) => {
        return mdlinks('exampleTests', options)
            .then(data => {
                expect(data[0].file).toEqual('exampleTests/example.md');
                expect(data[0].href).toEqual('https://developers.google.com/v8/');
                expect(data[0].text).toEqual('motor de JavaScript V8 de Chrome');
                done();
            })
    });
    test('Deberia permitir ingresar una ruta Directorio y mostrar --stats', (done) => {
        options.validate = false;
        options.stats = true;
        return mdlinks('exampleTests', options)
            .then(data => {
                expect(data[0].file).toEqual('exampleTests/example.md');
                expect(data[0].href).toEqual('https://developers.google.com/v8/');
                expect(data[0].text).toEqual('motor de JavaScript V8 de Chrome');
                done();
            })
    });
    test('Deberia permitir ingresar una ruta Directorio y mostrar  --validate', (done) => {
        options.validate = true;
        options.stats = false;
        return mdlinks('exampleTests', options)
            .then(data => {
                expect(data[0].file).toEqual('exampleTests/example.md');
                expect(data[0].href).toEqual('https://developers.google.com/v8/');
                expect(data[0].text).toEqual('motor de JavaScript V8 de Chrome');
                done();
            })
    });
    test('Deberia permitir ingresar una ruta Directorio y mostrar --validate --stats', (done) => {
        options.validate = true;
        options.stats = true;
        return mdlinks('exampleTests', options)
            .then(data => {
                expect(data[0].file).toEqual('exampleTests/example.md');
                expect(data[0].href).toEqual('https://developers.google.com/v8/');
                expect(data[0].text).toEqual('motor de JavaScript V8 de Chrome');
                done();
            })
    });
}) 