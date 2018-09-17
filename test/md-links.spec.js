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

    test('Deberia permitir ingresar un archivo y retornar un array de links',(done) => {
        options.validate = false;
        options.stats = false;

        mdlinks('README.md', options)
        .then((data) => {
            expect(data[0].href).toEqual('https://nodejs.org/api/fs.html');
            expect(data[0].text).toEqual('File System');
            expect(data[0].file).toEqual('Readme.md');
            done();
        })
    })
    test('Ingresar Directorio y obtener los links "md-links ./test/testsMD --stats --validate"', () => {
        jest.setTimeout(12000)
    
        options.stats = true;
        options.validate = true;
        return mdlinks('Readme.md', options) 
        .then(result8=>{
            console.log(result8);
    
            expect(result8).toBe("total:114\nunicos:0\nrotos:9");
        })
    });
}) 