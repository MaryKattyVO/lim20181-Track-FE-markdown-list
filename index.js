// Pidiendo módulos a usar de Node.js.
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Declarando variables globales:  
let options = {};
let total = 0;
let unique = 0;
let broken = 0;
let valid = 0;
let promises = [];
let results = [];
let Links = [];
let LinksDuplicates = [];

//-------------------------- Función: Convertir ruta relativa a absoluta ---------------------
const convertAbsolutePath = (route) => {
  absolute = path.resolve(route);
  return absolute;
}

//------------------------- Función: existe ruta ---------------------------------------------
const existRoute = (route) => {
  routeExist = fs.statSync(route);
  return routeExist;
}

//------------------------- Función: Leer archivo.-------------------------------------------
const readFiles = (route) => {
  // Ruta entrante convertida a Absoluta. 
  let pathAbsolute = convertAbsolutePath(route);
  // Lee ruta para saber si pertenece a un archivo o directorio. 
  const statsFile = existRoute(pathAbsolute);
  // Condicional: Si es un archivo. 
  if (statsFile.isFile() === true) {
    // Verificando si existe archivo.
    const existFiles = existFile(pathAbsolute);
    // Return existFiles;
    if (existFiles === true) {
      verificationFile(pathAbsolute, route);
    }
  } else if (statsFile.isDirectory() === true) {
      let files = fs.readdirSync(pathAbsolute);
      files.map((file) => {
      readFiles(route + '/' + file);
    });
  }
};

//----------------------------  Función: Verificación de opcion -----------------------------------------------
const verificationFile = (completePath, fileName) => {
  const extensionMd = validateFileMd(completePath);
  if (extensionMd === true) {
    // Si opción es: "--validate"
    const information = getInformationFile(completePath);
    // Separar el contenido en lineas
    const lines = information.split('\n');
    // Recorrido por cada linea
    loop(lines, fileName);
    // Promises
    Promise.all(promises)
    .then(() => {
      total = valid + broken;

      if (options.validate === false && options.stats === true) {
        let result = {
          total: total,
          unique: unique
        };
        results.push(result);
      } else if (options.validate === true && options.stats === true) {
          let result = {
            total: total,
            unique: unique,
            broken: broken
        };
        results.push(result);
      }
      if(options.stats === true){
        console.log('');
        console.log('**************************************************************');
        console.log('           Resultados de Link Encontrados                     ');
        console.log('**************************************************************');
        console.log('=> Total Links = '+ total);
        console.log('=> Unicos      = ' + unique);
        if(options.stats === true && options.validate === true){
        console.log('=> rotos       = '+ broken);
        }
      }
      total = 0;
      broken = 0;
      valid = 0;
      unique = 0;
      Links = [];
      LinksDuplicates = [];
      promises = [];
    });
  } else {
      return 'No se verifica extensiòn .md'
  }
}


//------------------------------ Función: Verifica si es una extensión Md. --------------------------------------
const validateFileMd = (file) => {
  // String.lastIndexOf() el método devuelve la última aparición del valor especificado ('.' en este caso). 
  // Devuelve -1 si no se encuentra el valor.
  // Los valores de retorno de lastIndexOf para el parámetro 'filename' y 
  // '.hiddenfile' son 0 y -1 respectivamente.Zero-fill operador de desplazamiento a
  // la derecha (»>) transformará -1 a 4294967295 y -2 a 4294967294, aquí es un truco 
  // para asegurar el nombre del archivo sin cambios en esos casos extremos.
  // String.prototype.slice() extrae la extensión del índice que se calculó anteriormente.
  // Si el índice es mayor que la longitud del nombre de archivo, el resultado es " ".
  const extension = file.slice((file.lastIndexOf('.') - 1 >>> 0) + 2);
	if (extension === 'md') {
		return true;
	} else {
		return false;
	}
}

//-----------------------------  Función: Verifica si existe archivo ------------------------------------------
const existFile = (file) => {
  const existFiles = fs.existsSync(file)
  return existFiles;
};

//---------------------- Función: Obtener contenido del archivo -----------------------------------------------
const getInformationFile = (file) => {
  const informationFile = fs.readFileSync(file, 'utf8');
  return informationFile;
}
//---------------------- Iterar contenido del archivo --------------------------------------------------------
const loop = (lines, file ) => {
  for (let line of lines){
    searchUrl(line, file);
  }
};

//-------------------- Funciòn: Encontrar URL:--------------------------------------------------------------
const searchUrl = (line, file) => {
  const urlRegex = /(\b(http?|https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  line.replace(urlRegex, (url) => {
    // Capturar texto de la url 
    const urlText = getUrlText(line);
    // Verificar si la url funciona. 
    validateUrl(url, urlText, file);
    // URl repetidos en el arreglo.
    if (Links.indexOf(url) === -1) {
      Links.push(url);
    } else {
        if (LinksDuplicates.indexOf(url) === -1){
          LinksDuplicates.push(url);
          
        }
      }
  });
  unique = Links.length - LinksDuplicates.length;
};

//------------------ Función: Obtener el texto de la URL.---------------------------------------------------
const getUrlText = (line) => {
  const urlLineText = line.substring(
    line.lastIndexOf( '[' ) + 1,
    line.lastIndexOf( ']' )
  );
  return urlLineText;
}

//------------------------- Función: Validando URL ----------------------------------------------------------
const validateUrl = (url, urlText, file) => {
	let promise = fetch(url)
	.then((response) => {
    if(response.statusText === 'OK'){
      if (options.validate === true) {
        console.log(url + ' ok ' + response.status + ' ' + urlText);
      }
      else {
        console.log(url);
      }
      valid = valid + 1;
    }else if(response.statusText === 'Not Found'){
      if (options.validate === true) {
        console.log(url + ' fail ' + response.status + ' ' + urlText);
      }
      broken = broken +1;
     
    }
		
		if (options.validate === true && options.stats === false) {
			let result = {
        href: url, 
        text: urlText, 
        file: file, 
        status: response.statusText
      };
			results.push(result);
    } 
    else if (options.validate === false && options.stats === false) {
			let result = {
        href: url, 
        text: urlText, 
        file: file
      };
			results.push(result);
		}
		
	})
	.catch((error) => {
	});
	promises.push(promise);
};

const mdlinks = (route, optionsConsole) => {
  options = optionsConsole;
  readFiles(route);

  return Promise.all(promises)
  .then((response)=>{
    let result = new Promise(() => {
      return results;
    });
    return result;
  });
};

module.exports = mdlinks;

