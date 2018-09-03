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
		//--validate
		if (program.validate) {
			options.validate = true;
		}

		//--stats
		if (program.stats) {
			options.stats = true;
		}

		mdlinks(file, options);
	})
	.parse(process.argv);