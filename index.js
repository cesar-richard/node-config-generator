#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');

function required (input) {
	var done = this.async();
	if (input.length === 0) {
		done('This parameter is required');
		return;
	}
	done(null, true);
}

function generateConfig(input) {
	var done = this.async();
	if (input.length === 0) {
		done('This parameter is required');
		return;
	}
	done(null, true);
}

program
.version('0.5.0', '-v, --version')
.description('Configuration generator')
.option('-n, --no-interactions', 'Script mode : Disable interactions')

program
.command('create')
.alias('c')
.description('Create new env configuration with name "name". Allowed names: developpement, testing, staging, production')
.option('-e, --envname <envname>', /^(developpement|testing|staging|production)$/i, 'developpement')
.option('-H, --dbhost <hostname>', 'Database host (default localhost)','localhost')
.option('-p, --dbport <port>', 'Database port (default 3306)',3306)
.option('-d, --dbdialect <dialect>', 'Database dialect (default mysql)','mysql')
.option('-u, --dbuser <user>', 'Database user')
.option('-P, --dbpassword <password>', 'Database password')
.option('-b, --dbname <basename>', 'Database name')
.option('-c, --casservice <url>', 'CAS callback URL')
.action((options) => {
	if(program.interactions){
		let dialectIndex = 0;
		switch(options.dbdialect){
			case "mysql":
			dialectIndex = 0;
			break;
			case "sqlilte":
			dialectIndex = 1;
			break;
			case "postgres":
			dialectIndex = 2;
			break;
			case "mssql":
			dialectIndex = 3;
			break;
			default:
			dialectIndex = 0;
			break;
		}
		let envnameIndex = 0;
		switch(options.envname){
			case "developpement":
			envnameIndex = 0;
			break;
			case "testing":
			envnameIndex = 1;
			break;
			case "staging":
			envnameIndex = 2;
			break;
			case "production":
			envnameIndex = 3;
			break;
			default:
			dialectIndex = 0;
			break;
		}

		const questions = [
		{
			type : 'input',
			name : 'dbhost',
			message : 'Database hostname',
			default : options.dbhost,
			validate : required,
		},
		{
			type : 'list',
			name : 'envname',
			message : 'Environement name',
			choices : ["developpement","testing","staging","production"],
			default : envnameIndex
		},
		{
			type : 'input',
			name : 'dbport',
			message : 'Database port',
			default : options.dbport,
			validate : required
		},
		{
			type : 'input',
			name : 'dbuser',
			message : 'Database user',
			default : options.dbuser,
			validate : required
		},
		{
			type : 'password',
			name : 'dbpassword',
			message : 'Database user\'s password',
			default : options.dbpassword,
			validate : required,
			when : options.dbpassword !== ''
		},
		{
			type : 'list',
			name : 'dbdialect',
			message : 'Database dialect (refer to sequelizejs doc). If different from mysql, you\'ll have to add the respective connector library to your project yourself.',
			choices : ["mysql","sqlite","postgres","mssql"],
			default : dialectIndex
		},
		{
			type : 'input',
			name : 'dbname',
			message : 'Database name',
			default : options.dbname,
			validate : required
		},
		{
			type : 'input',
			name : 'casservice',
			message : 'CAS service URL',
			default : options.casservice,
			validate : required
		}
		];

		inquirer.prompt(questions).then(answers => {
			config["is"+answers.envname.charAt(0).toUpperCase() + answers.envname.slice(1)] = true;
			console.log(config);
		});
	}
});

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
	program.outputHelp();
	process.exit();
}
program.parse(process.argv)