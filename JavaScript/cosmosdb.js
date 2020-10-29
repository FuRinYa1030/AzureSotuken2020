const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./cosmos_data/config");
const dbContext = require("./cosmos_data/databaseContext");

var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';
var reset   = '\u001b[0m';



//-----------------------------------------------------------------------------------------------------------------------------------------------



exports.ADDo = async function(){
  await console.log(magenta + 'ADDo start' + reset);
  const { endpoint, key, databaseId, containerId } = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  await dbContext.create(client, databaseId, containerId);

  var JsonData = [];

  try {
    const querySpec = {
      query: "SELECT * from c ORDER BY c.id_s"
    };

    const { resources: itemDefList } = await container.items.query(querySpec).fetchAll();
    JsonData = itemDefList;
    //console.log(JsonData);
    //await fs.writeFileSync('data.json',await JSON.stringify(JsonData, null, '    '));

  } catch (err) {await console.logred + (err.message + "@dataget\n" + reset);return err;}
  await console.log(magenta + 'ADDo finish\n' + reset);
  return JsonData;
}



//-----------------------------------------------------------------------------------------------------------------------------------------------



exports.ADU = async function(Res){
  await console.log(magenta + 'ADU start' + reset);
  const { endpoint, key, databaseId, containerId } = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  await dbContext.create(client, databaseId, containerId);

  var i = 0,j = 0;
  var idSt = '';



  try {
    const querySpec = {
      query: "SELECT * from c ORDER BY c.id_s"
    };
    const { resources: itemDefList } = await container.items.query(querySpec).fetchAll();


    try {
      for (const itemDef of itemDefList) {j++}
      idSt = String(j + 1);

      if(Number(itemDefList[0].id) == 1 && Number(itemDefList[j - 1].id) != j){
        for (const itemDef of itemDefList) {
          if(Number(itemDefList[i].id) + 1 == Number(itemDefList[i + 1].id)){i++;}
          else {idSt = String(i + 2);break;}
        }
      }
      else if(Number(itemDefList[0].id) != 1){idSt = String(1);}
    } catch (err) {await console.log(red + err.message + "@id_set\n" + reset);return err;}
  } catch (err) {await console.log(red + err.message + "@dataget\n" + reset);return err;}



  JsonData = {
    id: idSt,
    id_s: Number(idSt),
    dog:Res.dog,
    cat:Res.cat,
    isComplete: false
  }



  try {
    const { resource: createdItem } = await container.items.create(JsonData);
    await console.log(cyan + 'Created item:' + reset);
    await console.log(createdItem);
  } catch (err) {await console.log(red + err.message + "@datacreate\n" + reset);return err;}
  await console.log(magenta + 'ADU finish\n' + reset);
}



//-----------------------------------------------------------------------------------------------------------------------------------------------



exports.ADDe = async function(Res){
  await console.log(magenta + 'ADDe star' + reset);
  const { endpoint, key, databaseId, containerId } = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  await dbContext.create(client, databaseId, containerId);

  var i = 0,j = 0;

  try {
    const querySpec = {
      query: "SELECT * from c ORDER BY c.id_s"
    };

    const { resources: itemDefList } = await container.items.query(querySpec).fetchAll();
    for (const itemDef of itemDefList) {i++;}
    for(j = 0;j < i;j++){if(Number(Res[3]) == itemDefList[j].id)break;}

    await container.item(itemDefList[j].id, undefined).delete();

    console.log(cyan + "Deleted item with id:" + yellow + itemDefList[j].id + reset);

  } catch (err) {await console.log(red + err.message + "@datadelete\n" + reset);return err;}
  await console.log(magenta + 'ADDe finish\n' + reset);
}
