const fs = require('fs')
//const mime = require('mime-types');
const Filetype = require('file-type');


const file = './OtherComponents/StaticFile.json'//fs.readFileSync('./OtherComponents/StaticFile.json');
var StaticFile = JSON.parse(fs.readFileSync('./OtherComponents/StaticFile.json'));

/*
a = 'aaa.html';
console.log(StaticFile);
console.log(mime.lookup(a));
console.log(mime.contentType(a));
console.log(filetype(StaticFile));
*/

const fileType = Filetype.fromFile(file)
console.log(fileType);
