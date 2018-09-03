#!/usr/bin/env node 
const mdlinks = require('./index');
const program = require('commander');

program
  .option('--validate', 'Validar')
	.option('--stats', 'Mostrar stats')
	//.action(mdlinks)
	.action((file, commands) => {
    const options = {
      validate: false,
      stats: false
    };
		//si recibe comando --validate, cambia a true el options.validate
		if (program.validate) {
			options.validate = true;
		}

		//si recibe comando --stats, cambia a true el options.stats
		if (program.stats) {
			options.stats = true;
		}

		mdlinks(file, options);
	})
	.parse(process.argv);