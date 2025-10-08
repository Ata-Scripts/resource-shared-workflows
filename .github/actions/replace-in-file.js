const replace = require('replace-in-file');

const questionMark = "B428A35";
const backTick = "A932A08";

function doReplace() {
    return {
        files: 'main.lua',
        from: [/\?\./g, /`/g],
        to: [questionMark, backTick],
        countMatches: true
    };
}

function undoReplace() {
    return {
        files: 'main.lua',
        from: [new RegExp(questionMark, 'g'), new RegExp(backTick, 'g')],
        to: ['?.', '`'],
        countMatches: true
    };
}

const mode = process.argv[2];

try {
    const results = replace.sync(mode === 'do' ? doReplace() : undoReplace());
    console.log('Replacement results:', results);
} catch (error) {
    console.error('Error occurred:', error);
}
