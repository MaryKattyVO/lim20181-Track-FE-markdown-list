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
        .then(result => {
            console.log(result);
            expect(result).toBe("Readme.md\thttps://es.wikipedia.org/wiki/Markdown\tMarkdown");
        })
    })
    test('Deberia ingresar un directorio y obtener los links "md-links Readme.md  --stats --validate"', (done) => { 
        options.stats = true;
        options.validate = true;
        return mdlinks('Readme.md', options) 
        .then(result=>{
            console.log(result);
    
            expect(result).toBe("total:38\nunicos:28\nrotos:3");
            done();
        })
    });
}) 