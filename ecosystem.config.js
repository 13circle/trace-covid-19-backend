module.exports = {
	apps: [
		{
			name: "trace-covid-19-backend",
			script: "./bin/www",
			instances: 0,
			exec_mode: "cluster",
		},
	],
};
