const config = {
  endpoint: "https://2020-2021-sotuken-cosmosdb.documents.azure.com:443/",
  key: "",
  databaseId: "2020-2021-sotuken-CosmosDB-Container",
  containerId: "DataList",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
