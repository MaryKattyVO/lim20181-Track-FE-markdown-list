/*const sum = require('./sum');
test('adds 1+2 to equal 1',() => {
    expect(sum(1,2)).toBe(3);
});
test('object assigment',() => {
    const data = {one:1};
    data['two'] = 2;
    expect(data).toEqual({one:1,two: 2});
});*/
const mdLinks = require('./index.js');
jest.setTimeout(300000);
describe('Verificar si es una función',() => {
    test('Validando que mdLinks es función', () => {
        expect(typeof mdLinks).toEqual('function');
    });
    
})
