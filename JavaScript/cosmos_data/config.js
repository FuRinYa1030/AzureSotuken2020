const config = {
  endpoint: "https://furinya1030.documents.azure.com:443/",
  key: "kozbiKpDOuo6lKkyifsc1q0qgzrSElXDeyOqb98Q5gibWwibt5j8jjrIyB7OxZK1VfcR0RL8YaRGuSVzJdZu0Q==",
  databaseId: "SUSHIPASSPORT_Database",
  containerId: "PersonalDataList",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
