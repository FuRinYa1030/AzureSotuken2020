const config = require("./config");
const CosmosClient = require("@azure/cosmos").CosmosClient;

var black   = '';
var red     = '';
var green   = '';
var yellow  = '';
var blue    = '';
var magenta = '';
var cyan    = '';
var white   = '';
var reset   = '';

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
