var fs = require('fs');
var request = require('sync-request');

const predictionKey = "6f41c1b5f9c440d7a7b941b4fb796295";
const endPoint = "https://cvs-1-5000.cognitiveservices.azure.com/customvision/v3.0/Prediction/557f5036-476c-4f44-9ccf-60b7312635eb/classify/iterations/Iteration1/image";


var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';
var reset   = '\u001b[0m';

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
        cat: JsonData2.predictions[0].probability
      }
    }
    else if(JsonData2.predictions[0].tagName === 'dog'){
      JsonData3 = {
        dog: JsonData2.predictions[0].probability,
        cat: JsonData2.predictions[1].probability
      }
    }



    await console.log(JsonData3);

    await console.log(magenta + 'CVS-Analysis finish\n' + reset);
    return await JsonData3;
  } catch (err) {await console.logred + (err.message + "@CVS-Analysis-access\n" + reset);return err;}
}
