#!/usr/bin/env node 
const mdlinks = require('./index');
const program = require('commander');

program
.option('-v, --validate', 'Validates')
.option('-s, --stats', 'statss')
.action((file) => {
	const options = {
		validate: false,
		stats: false
	};

	if (program.validate) {
		options.validate = true;
	}

	if (program.stats) {
		options.stats = true;
	}
 
	mdlinks(file, options)
	.then((result) => {
		result.map((data) => {
			if (options.validate === true && options.stats === false) {
				
				if (data.status === 'OK') {
					console.log(`${data.file} ${data.href} ${data.status} ${data.text}`);
				} else {
					console.log(`${data.file} + ' ' + ${data.href} + ' - fail ' + ${data.text}`);
				}
			} else if (options.validate === false && options.stats === false) {

				console.log(`${data.file} + ' ' + ${data.href} + ' ' + ${data.text}`);
			} else if (options.validate === false && options.stats === true) {
				console.log('Estadisticas para este archivo');
				console.log('total: ' + `${data.total}`);
				console.log('unicos: ' + `${data.unique}`);
			} else if (options.validate === true && options.stats === true) {
				console.log('Estadisticas para este archivo');
				console.log('total: ' + `${data.total}`);
				console.log('unicos: ' + `${data.unique}`);
				console.log('rotos: ' + `${data.broken}`);
			}
		});
	});
})
.parse(process.argv);