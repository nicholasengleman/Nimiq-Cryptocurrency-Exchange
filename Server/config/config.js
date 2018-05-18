const config = {
	production: {
		SECRET: process.env.SECRET,
		DATABASE: process.env.MONGOLAB_URI
	},
	default: {
		SECRET: 'supersecretpassword',
		DATABASE: 'mongodb://engleman:11july2017@ds051630.mlab.com:51630/nimiq-exchange'
	}
};

exports.get = function get(env) {
	return config[env] || config.default;
};