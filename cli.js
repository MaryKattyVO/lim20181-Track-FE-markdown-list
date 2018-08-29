#!/usr/bin/env node
const fs = require('fs');


const [,, ...args] = process.argv;
const path = require('path').resolve(args[0]);


//Definir si es carpeta o archivo
const verifiedDir=(files,arr)=>{
  arr= arr || [];
  fs.readdir(files,(err, data) => {
    data.forEach(file => {
      fs.stat(files,(err, stats) => {
        if (err) {
          throw("Error");
            
        }
        else {
          if(stats.isDirectory())
          {
            console.log(files + "es carpeta");
          }
          else if(stats.isFile())
          {
            console.log(files + "es archivo");
          }
        }
      })
    })
  })
}

verifiedDir(path);
// // leer archivo de forma sincrona

//     fs.readFile(path(args[0]), 'utf-8', (err, data) => {
//       if(err) {
//         console.log('error: ', err);
//       } else {
//         console.log(data);
//       }
//     });

//     fs.readdir(path(args[0]), 'utf-8', (err, data) => {
//       if(err) {
//         console.log('error: ', err);
//       } else {
//         console.log(data);
//       }
//     });
//     // let archivo = fs.readFileSync('archivo2.txt', 'utf-8');
//     console.log(archivo);

 