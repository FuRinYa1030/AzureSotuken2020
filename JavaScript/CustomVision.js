var fs = require('fs');

var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';
var reset   = '\u001b[0m';


exports.Analysis = async function(Res){
  await console.log(magenta + 'CVS-Analysis start' + reset);

  Res[3] = await Res[3].replace(/%2F/g,"/");
  Res[3] = await Res[3].replace(/%2B/g,"+");
  Res[3] = await Res[3].replace(/%3D/g,"=");

  try {
    var decode = new Buffer.from(Res[3],'base64');
    await fs.writeFileSync('test.png',decode,'base64');
  } catch (err) {await console.logred + (err.message + "@CVS-Analysis-save\n" + reset);return err;}

  var JsonData2 = {
    "id": "1",
    "id_s": 1,
    "firstname": "sakaguchi",
    "lastname": "fumiya",
    "mailaddress": "sf238238%40gmail.com",
    "passward": "Asfx01ares"
  }



  await console.log(magenta + 'CVS-Analysis finish\n' + reset);
  return JsonData2;
}
