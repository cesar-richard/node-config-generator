const config = {
	logger: {
		level: 'error'
	},
	common: {
		port: 3653,
		cas: {
			is_dev_mode: true,
			dev_mode_user: 'devuser',
			dev_mode_info: {
				mail: 'foo@bar.fr',
				displayName: 'Firstname Lastname',
				cn: 'Firstname Lastname',
				givenName: 'Firstname',
				sn: 'Lastname',
				accountProfile: 'accountProfile',
				ou: 'staff',
				successfulAuthenticationHandlers: 'LdapAuthenticationHandler',
				samlAuthenticationStatementAuthMethod: 'urn:oasis:names:tc:SAML:1.0:am:password',
				authenticationMethod: 'LdapAuthenticationHandler',
				authenticationDate: '2018-04-14T15:27:01.939+02:00[Europe/Paris]',
				longTermAuthenticationRequestTokenUsed: 'false'
			}
		}
	}
}