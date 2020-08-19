const config = {
  endpoint: "https://2020-2021-sotuken-cosmosdb.documents.azure.com:443/",
  key: "MtIcblzFIYOMnbz6mdeQQEVIUAt3xUf9t4HqR4A0eIIqVLPnFB8TyeNhcLbebw7d6cx20Kz23aMYbJnD6YgX4A==",
  databaseId: "2020-2021-sotuken-CosmosDB-Container",
  containerId: "DataList",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
