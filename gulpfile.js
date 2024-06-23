'use strict';

const gulpTasks = require('./gulp-tasks');

gulpTasks.create({
    baseTasks: {
        'scripts-base': {
        },
    },
    otherTasks: {
        static: {
            eslint: {
                enable: true,
                buildProject: false,
                files: ['export.js'],
            },
            'scripts-base': {
                enable: true,
                buildProject: false,
                files: ['export.js'],
            },
            'styles-base': {
                enable: true,
                buildCommon: false,
                buildProject: true,
                files: [{
                    filename: 'export',
                    sources: [
                        './static/styles/blocks/main.less',

                    ],
                }],
            },
            build: {
                enable: true,
                tasks: ['styles-base-static', 'scripts-base-static'],
            },
        },
    },
});