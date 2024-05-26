/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');

function readDir(dir) {
    let items = [];

    dir = path.normalize(dir);

    try {
        items = fs.readdirSync(dir);

        // eslint-disable-next-line
    } catch (err) {
    }

    return items;
}

function getPages(dir) {
    const dirs = [];
    const items = readDir(dir);

    for (const item of items) {
        const itemPath = path.normalize(dir + '/' + item);

        // should be a directory and not UNIX hidden directory
        if (fs.lstatSync(itemPath).isDirectory() && item.charAt(0) !== '.') {
            dirs.push(item);
        }
    }

    dirs.sort();

    return dirs;
}

module.exports = {
    getPages: getPages,
    readDir: readDir,
};