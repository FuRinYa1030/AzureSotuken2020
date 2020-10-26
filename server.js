const http = require('http');
//const mime = require('mime-types');
var url1 = require('url');
var fs = require('fs');

var CMDB = require('./JavaScript/cosmosdb.js');
var CVS = require('./JavaScript/CustomVision.js');

var Res;

var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';
var reset   = '\u001b[0m';

var toString = Object.prototype.toString;

//----------------------------------------------------------------------------------------------------------------------------------------------------



const server = http.createServer(async(request, response) => {
  var target = '';
  var content = '';
  var postData = '';
  var url = await request.url; //リクエストからURLを取得
  var urlInfo = await url1.parse(request.url, true);
  var pathname = await urlInfo.pathname;
  var pathname_toggle = pathname.split('.');
  var StaticFile_toggle = false;


  if(pathname_toggle[1] === 'html' | pathname_toggle[1] === 'css' | pathname_toggle[1] === 'js' | pathname_toggle[1] === 'lib'){
    var StaticFile = JSON.parse(fs.readFileSync('./OtherComponents/StaticFile.json'));

    for(const StaticFile_s of StaticFile[pathname_toggle[1].toUpperCase()]){
      if(StaticFile_s.pathname === pathname){
        target = StaticFile_s.target;
        content = StaticFile_s.content;
        StaticFile_toggle = true;
        break;
      }
    }

    if(StaticFile_toggle === false){
      console.log(red + "Server couldn't return response to need request by user :@if_under" + reset);
      Error(response,'');
      return;
    }

  }else{
    switch (pathname) {
      case '/':
        target = 'HTML/index_http.html';
        content = 'text/html';
        break;

      case '/json':
        var JsonData = await CMDB.ADDo();
        await response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        await response.end(await JSON.stringify(JsonData, null, '    '));

      //-------post_communication---------------------------------------------------------------------------------------------------------------------
      case '/post':
        try{
          console.log(postData);
          if(request.method === 'POST') {
            await request.on('data', async function(chunk) {
              //console.log(toString.call(chunk).slice(8, -1).toLowerCase());
              //postData += await chunk.toString('utf-8', 0, chunk.length);
              postData += chunk;
            }).on('end', async function() {
              Res = await postData.split(/[&=]/);
              if(request.headers['content-type'] === 'text/plain; charset=utf-8'){
                await console.log(yellow + '----------------------------------------' + reset);
                await console.log(magenta + "Processing is the "+ "CVS" + reset);

                var Result = await CVS.Analysis(Res);

                await response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                await response.end(await JSON.stringify(Result, null, '    '));
              }

              else if(request.headers['content-type'] === 'application/x-www-form-urlencoded; charset=UTF-8'){
                await console.log(yellow + '----------------------------------------' + reset);
                await console.log(magenta + "Processing is the "+ Res[1] + reset);

                if(Res[1] === 'Download'){
                  await console.log(magenta + 'post-ADDo\n' + reset);
                  var JsonData = await CMDB.ADDo();

                  await response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                  await response.end(await JSON.stringify(JsonData, null, '    '));
                }

                else if(Res[1] === 'Upload'){
                  await console.log(magenta +'post-ADU\n' + reset);
                  await CMDB.ADU(Res);
                  await response.end();
                }

                else if(Res[1] === 'Delete'){
                  await console.log(magenta + 'post-ADDe\n' + reset);
                  await CMDB.ADDe(Res);
                  await response.end();
                }

                else {Error(response,'database');return;}
              }

              else{Error(response,'post');return;}
            });
          }
        }catch (err){await console.log(red + err.message + " @POST signal" + reset + "\n");}
        return;

      default:
        Error(response,'default');
        return;
    }
  }



  //--------------------------------------------------------------------------------------------------------------------------------------------------



  try{
    if(content == 'text/html')console.log(yellow + '----------------------------------------' + reset);
    await console.log(cyan + 'request come url : ' + yellow + url + reset);
    await fs.readFile(target, 'utf-8' , doReard );
  } catch (err){console.log(red + err.message + " @readfile false" + reset + "\n");}

  // コンテンツを表示する。
  async function doReard(err, data) {
    await response.writeHead(200, {'Content-Type': content});
    await response.write(data);
    await response.end();
  }
});


async function Error(response, plase){
  if(plase != ''){
    console.log(red + "Server couldn't return response to need request by user :@switch_" + plase + reset);
    await response.writeHead(404, {'Content-Type': 'text/plain'});
    await response.end('404 Not Found');
  }
  else {
    await response.writeHead(404, {'Content-Type': 'text/plain'});
    await response.end('404 Not Found');
  }
  return;
}
//----------------------------------------------------------------------------------------------------------------------------------------------------



const port = process.env.PORT || 1337;
server.listen(port);
console.log(cyan + "Server running at http://localhost:" + yellow + port + reset);
