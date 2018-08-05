const config = {
	environement: answers.envname,
	logger: {
		level: 'info'
	},
	common: {
		port: 3651,
		database: {
			database: answers.dbname,
			host: answers.dbhost,
			username: answers.dbuser,
			password: answers.dbpassword,
			dialect: answers.dbdialect
		}
	}
}