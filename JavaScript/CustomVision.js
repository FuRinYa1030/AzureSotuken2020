var fs = require('fs');
var request = require('sync-request');

const predictionKey = "";

const endPoint = "";


var black   = '';
var red     = '';
var green   = '';
var yellow  = '';
var blue    = '';
var magenta = '';
var cyan    = '';
var white   = '';
var reset   = '';

var JsonData2;
var JsonData3;

exports.Analysis = async function(Res){
  await console.log(magenta + 'CVS-Analysis start' + reset);

  Res[3] = await Res[3].replace(/%2F/g,"/");
  Res[3] = await Res[3].replace(/%2B/g,"+");
  Res[3] = await Res[3].replace(/%3D/g,"=");

  try {
    var decode = await Buffer.from(Res[3],'base64');

    var options = {
      //uri: endPoint,
      headers: {
        "Content-Type": "application/octet-stream",
        "Prediction-Key": predictionKey
      },
      body: decode
    };
    //await fs.writeFileSync('test.png',decode);
  } catch (err) {await console.logred + (err.message + "@CVS-Analysis-save\n" + reset);return err;}

  try {
    var res = await request('POST',endPoint,options);
    var buffer = res.getBody()
    var string = buffer.toString('utf-8', 0, buffer.length);

    JsonData2 = await JSON.parse(string);

    if(JsonData2.predictions[0].tagName === 'cat'){
      JsonData3 = {
        dog: JsonData2.predictions[1].probability,
        cat: JsonData2.predictions[0].probability,
        total: 0,
        cvs: 0,
        db: 0
      }
    }
    else if(JsonData2.predictions[0].tagName === 'dog'){
      JsonData3 = {
        dog: JsonData2.predictions[0].probability,
        cat: JsonData2.predictions[1].probability,
        total: 0,
        cvs: 0,
        db: 0
      }
    }



    await console.log(JsonData3);

    await console.log(magenta + 'CVS-Analysis finish\n' + reset);
    return await JsonData3;
  } catch (err) {await console.logred + (err.message + "@CVS-Analysis-access\n" + reset);return err;}
}
