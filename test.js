/*const fs = require('fs')
//const mime = require('mime-types');
const Filetype = require('file-type');


const file = './OtherComponents/StaticFile.json'//fs.readFileSync('./OtherComponents/StaticFile.json');
var StaticFile = JSON.parse(fs.readFileSync('./OtherComponents/StaticFile.json'));
*/
/*
a = 'aaa.html';
console.log(StaticFile);
console.log(mime.lookup(a));
console.log(mime.contentType(a));
console.log(filetype(StaticFile));
*/
/*
const fileType = Filetype.fromFile(file)
console.log(fileType);
*/

var a = new Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48]);
console.log(a);

var postData = a.toString('utf-8');
console.log(postData);

buf = new Buffer.from([0xe3, 0x81, 0x82, 0xe3, 0x81, 0x84, 0xe3, 0x81, 0x86, 0xe3, 0x81, 0x88, 0xe3, 0x81, 0x8a]);
console.log(buf.toString('UTF-8'));
