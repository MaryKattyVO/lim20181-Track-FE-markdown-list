#!/usr/bin/env node
const fs = require('fs');
const path = require('path').resolve;

const [,, ...args] = process.argv;


//Definir si es carpeta o archivo
    fs.stat(path(args[0]), (err, stats) => {
        if (err) {
            throw("Error");
            
        }
        else {
          if(stats.isDirectory()){
          console.log(args[0] + "es carpeta");
     
     
        }else if(stats.isFile()){
          console.log(args[0] + "es archivo");
     
     
        }else {
          throw(args[0] + "error");
          }
        }
    });

// leer archivo de forma sincrona

    fs.readFile(path(args[0]), 'utf-8', (err, data) => {
      if(err) {
        console.log('error: ', err);
      } else {
        console.log(data);
      }
    });

    fs.readdir(path(args[0]), 'utf-8', (err, data) => {
      if(err) {
        console.log('error: ', err);
      } else {
        console.log(data);
      }
    });
    // let archivo = fs.readFileSync('archivo2.txt', 'utf-8');
    console.log(archivo);

 