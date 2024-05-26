/*
 * gulp watch - выполнение задачи в зависимости от измененного файла css/js
 * gulp build - пересобрать все
 * gulp eslint - проверка js синтаксиса
 * gulp eslint-fn - проверка js синтаксиса только динамических модулей
 * gulp styles - сборка всего css
 * gulp styles-pages - сборка css только отдельных страниц
 * gulp styles-fn - сборка css только динамических модулей
 * gulp scripts - сборка всего js
 * gulp scripts-base - сборка js ядра, страниц и виджетов
 * gulp scripts-fn - сборка js только динамических модулей
 */
module.exports = {
    basePaths: {
        scripts: {
            src: 'static/scripts',
            dst: 'static/build/scripts',
            common: 'static/scripts',
            html: {
                project: 'app/views/public',
            },
        },
        styles: {
            src: './static/styles',
            dst: './static/build/styles',
            common: 'static/styles',
            project: 'static/styles',
        },
    },
    baseTasks: {
        'eslint': {
            enable: true,
            buildProject: true,
        },
        'eslint-fn': {
            enable: true,
        },
        'scripts-base': {
            enable: true,
            files: ['main.js'],
        },
        'scripts-fn': {
            enable: true,
        },
        'styles-base': {
            enable: true,
            buildProject: true,
            includeReset: true,
        },
        'styles-fn': {
            enable: true,
            buildCommon: false,
        },
        'styles-pages': {
            enable: true,
        },
        'styles': {
            enable: true,
            tasks: ['styles-base', 'styles-fn', 'styles-pages'],
        },
        'scripts': {
            enable: true,
            tasks: ['scripts-base', 'scripts-fn'],
        },
        'build': {
            enable: true,
            tasks: ['styles', 'scripts'],
        },
        'watch': {
            enable: true,
            tasks: ['styles', 'scripts'],
        },
        'update': {
            enable: true,
        },
        'clean': {
            enable: true,
        },
    },
};