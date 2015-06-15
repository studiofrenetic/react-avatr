var gulp = require('gulp'),
    initGulpTasks = require('react-component-gulp-tasks');

var taskConfig = {

	component: {
		name: 'Avatr'
	},

	example: {
		src: 'examples/src',
		dist: 'examples/dist',
		standalone: true,
		files: [
			'index.html',
			//'standalone.html',
			'.gitignore'
		],
		scripts: [
			'app.js'
		]
	}

};

initGulpTasks(gulp, taskConfig);
