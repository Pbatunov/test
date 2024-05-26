/* eslint-env node */
'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

function getWidgetsInitialization(widgets) {
    const inits = [];

    // eslint-disable-next-line
    widgets.map(function(widget) {
        const template = [
            '        if (' + getJSname(widget) + '.shouldRun() === true) {\n',
            '            ' + getJSname(widget) + '.init();\n',
            '        }\n',
        ].join('');

        inits.push(template);
    });

    return inits.join('\n');
}

function getDirs(dir) {
    const dirs = [];
    let items;

    dir = path.normalize(dir);

    try {
        items = fs.readdirSync(dir);
    } catch (err) {
        return [];
    }

    if (items.length) {
        // eslint-disable-next-line
        items.map(function(item) {
            const itemPath = path.normalize(dir + '/' + item);

            // should be a directory and not UNIX hidden directory
            if (fs.lstatSync(itemPath).isDirectory() && item.charAt(0) !== '.') {
                dirs.push(item);
            }
        });

        dirs.sort();
    }

    return dirs;
}

function getDeps(params) {
    const deps = [];
    const items = params.items;

    // eslint-disable-next-line
    items.map(function(item) {
        deps.push('const ' + getJSname(item) + ' = require(\'./' + item + '/main\');');
    });

    return deps.join(params.separator);
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getJSname(name) {
    name = name.split('-');

    const first = name.shift();
    const parts = [];

    // eslint-disable-next-line
    name.map(function(part) {
        parts.push(capitaliseFirstLetter(part));
    });

    return (first + parts.join(''));
}

module.exports = {
    create: function(taskName, basePaths, config, gulp, seriaName) {
        let paths;

        if (seriaName) {
            taskName += '-' + seriaName;
        }

        if (config.paths) {
            paths = _.merge({}, basePaths.scripts, config.paths);
        } else {
            paths = basePaths.scripts;
        }

        gulp.task(taskName, function(done) {
            const widgets = getDirs(paths.src + '/widgets');
            let mainjs = '';

            if (widgets.length === 0) {
                const mkdirSync = function(path) {
                    try {
                        fs.mkdirSync(path);
                    } catch (e) {
                        if (e.code !== 'EEXIST') {
                            throw e;
                        }
                    }
                };

                mkdirSync(paths.src + '/widgets');
            } else {
                mainjs = [
                    getDeps({
                        items: widgets,
                        separator: '\n',
                    }),
                    '\n\n',
                    'module.exports = {\n',
                    '    init: function() {\n',
                    getWidgetsInitialization(widgets),
                    '    }\n',
                    '};',
                ].join('');
            }

            fs.writeFileSync(path.normalize(paths.src + '/widgets/main.js'), mainjs);
            done();
        });
    },
};