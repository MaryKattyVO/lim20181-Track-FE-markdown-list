//-------------- Obteniendo métodos con require -----------------------------------------
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

let options = {};
let total = 0;
let valid = 0;
let broken = 0;
const link = [];
const linkDuplex = [];
let unique = 0;
const promises = [];
const results = [];

//----------------------- Función que permite convertir una ruta a Absoluta -------------------
const convertAbsolute = (route) => {
	return path.resolve(route);
}

//--------------------- Función que permite verificar estado de la routa ----------------------
const verificationRoute = (routeAbsolute) => {
	return fs.statSync(routeAbsolute);
}

//--------------------- Función que permite leer archivo -------------------------------
const readFile = (route) => {
	const pathAbsolute = convertAbsolute(route);
	const statsFile = verificationRoute(pathAbsolute);
	if (statsFile.isFile()) {
		const exist = fileExists(pathAbsolute);
		if (exist) {
			recorredFile(pathAbsolute, route);
		}
	} else if (statsFile.isDirectory()) {
		const files = verificationDir(pathAbsolute);

		files.map((file) => {
			readFile(route + '/' + file);
		});
	}
};

//--------------- Función que permite recorrer archivo -------------------------------------
const recorredFile = (route, nameFile) => {
	const extension = validateMd(route);
	if (extension === '.md') {
		const information = getfileInformation(route);
		const linesFile = information.split('\n');
		loopInformationFile(linesFile, nameFile);
	}
};

//-------------------- Función para poder verificar extensión Md ----------------------------
const validateMd = (file) => {
	return path.extname(file);
};

//-------------------- Función que verifica que existe archivo ------------------------------
const fileExists = (files) => {
	if (fs.existsSync(files)) {
		return exist = true;
	}
};

//-------------------- Función que verifica estado de directorio -----------------------------
const verificationDir = (routeAbsolute) => {
	return fs.readdirSync(routeAbsolute);
}

//------------------ Función que permite obtener contenido del archivo -----------------------
const getfileInformation = (file) => {
	const contents = fs.readFileSync(file, 'utf8');
	return contents;
}

//----------------- Función que permite recorrer linea por linea file -----------------------------------
const loopInformationFile = (linesfile, file) => {
	for (let line of linesfile) {
		searchUrl(line, file);
	}
};

//------------------- Función que permite buscar Urls ---------------------------------------------------
const searchUrl = (lineFile, file) => {

	const urlRegex = /(\b(http?|https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

	lineFile.replace(urlRegex, (urls) => {
		const urlText = extractTextFlagUrl(lineFile);
		//Permite validar si la url encontrada existe:
		validateAllUrl(urls, urlText, file);
		//Verifica si se repiten los urls:
		if (link.indexOf(urls) === -1) {
			link.push(urls);
		} else {
			if (linkDuplex.indexOf(urls) === -1) {
				linkDuplex.push(urls);
			}
		}
	});
	const lengthLink = link.length;
	const lengthLinkDuplex = linkDuplex.length;
	unique = lengthLink - lengthLinkDuplex;
};

//--------------------- Función que permite extraer el texto de los links -----------------------------
const extractTextFlagUrl = (lines) => {
	const urlLineText = lines.substring(
		lines.lastIndexOf('[') + 1,
		lines.lastIndexOf(']')
	);
	return urlLineText;
};

//----------------------- Función que permite validar las Urls ------------------------
const validateAllUrl = (url, text, file) => {
	const promise = fetch(url)
		.then((res) => {

			switch (res.statusText) {
				case 'OK':
					valid++;
					break;
				default:
					broken++;
					break;
			}

			if (options.validate === true && options.stats === false) {
				let result = {
					href: url,
					text: text,
					file: file,
					status: res.statusText
				};
				results.push(result);
			} else if (options.validate === false && options.stats === false) {
				let result = {
					href: url,
					text: text,
					file: file
				};
				results.push(result);
			}

		})
		.catch((error) => {
			return error;
		});

	promises.push(promise);
};

//----------------------- Función mdLinks que recibe como parametro routa y opciones -------------
const mdlinks = (route, option) => {
	return new Promise(async (resolve, reject) => {
		options = option;
		readFile(route);
		await Promise.all(promises)
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
			});

		return resolve(results);
	});
};

module.exports = mdlinks;