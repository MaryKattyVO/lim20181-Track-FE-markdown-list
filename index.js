// Pidiendo módulos a usar de Node.js.
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

let texto = 'texto.txt';

//Función leer un archivo
const readFile = (file) => {
  return new Promise((resolve,reject) => {
    fs.readFile(file,'utf8',(err,data) => {
      if(err) reject(err);

        const expression = /(?:__|[])|\[(.*?)\]\(.*?\)/gm; // reconoce links de un markdown
        const textLink = /\[(.*)\]/gi
        const urlLink = /\]\((.*?|(https?|http?|ftp):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]))\)/gi;

        const regex = new RegExp(urlLink);
        const regexText = new RegExp(textLink);
        const dataLinks = data.match(regex);
        const dataText = data.match(regexText);
        console.log(dataLinks);
        console.log(dataText);
      resolve(data);
      //console.log(data);
    })
  })
}
readFile('Readme.md');
//Función estado de archivo
const statFile = (path) => {
  return new Promise((resolve,reject) => {
    fs.stat(path, (err, data) => {
      if(err) return reject(err);
      resolve(data)
      console.log(data);
    })
  })
}
//console.log(statFile(texto));

//Función leer un directorio
const readdir = (path) => {
  return new Promise((resolve, reject) => fs.readdir
  (path,(err, files) => err ? reject(err) : resolve(files),
  ))
}
//console.log(readdir('file'));
//Extraer Link
// Lee los archivos Forma Asincrona  ==================================



































