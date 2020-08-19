const config = require("./config");
const CosmosClient = require("@azure/cosmos").CosmosClient;

var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';
var reset   = '\u001b[0m';

/*
// This script ensures that the database is setup and populated correctly
*/
async function create(client, databaseId, containerId) {
  const { partitionKey } = config.partitionKey;

  /**
   * Create the database if it does not exist
   */
  const { database } = await client.databases.createIfNotExists({
    id: databaseId
  });
  console.log(cyan + `Created database:` + yellow + `${database.id}` + reset);

  /**
   * Create the container if it does not exist
   */
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists(
      { id: containerId, partitionKey },
      { offerThroughput: 400 }
    );

  console.log(cyan + `Created container:` + yellow + `${container.id}` + reset);
}

module.exports = { create };
