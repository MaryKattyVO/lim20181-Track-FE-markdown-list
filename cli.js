#!/usr/bin/env node 
const mdlinks = require('./index');
const program = require('commander');

let options = {
	validate: false,
	stats: false
};

program
.arguments('<path>')
.option('-v, --validate', 'Validar si Links estan válidos o rotos')
.option('-s, --stats', 'Mostrar estado de los links')
.action((path) => {

	if (program.validate) {
		options.validate = true;
	}
	if (program.stats) {
		options.stats = true;
	}
	mdlinks(path, options)
	.then((result) => {
		result.map((data) => {

			if (!options.validate && !options.stats) {
				console.log(`${data.file}\t${data.href}\t${data.text}`);
			} else if (options.validate && options.stats) {
				console.log('**************************************************')
				console.log('Resultado estados links');
				console.log('--------------------------------------------------')
				console.log(`Total:\t${data.total}\nUnicos:\t${data.unique}\nRotos:\t${data.broken}`);
				console.log('**************************************************')
			} else if (!options.validate && options.stats) {
				console.log('**************************************************')
				console.log('Resultado estados links');
				console.log('--------------------------------------------------')
				console.log(`Total:\t${data.total}\nUnicos:\t${data.unique}`);
				console.log('**************************************************')
			} else if (options.validate && !options.stats) {
				if (data.status === 'OK') {
					console.log(`${data.file}\t${data.href}\t${data.status}\t200\t${data.text}`);
				} else {
					console.log(`${data.file}\t${data.href}\t${data.status}\t404\t${data.text}`);
				}
			}
		});
	});
})
.parse(process.argv);