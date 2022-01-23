//----Modules and configuration----//
const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({ "apiKey": "4c6dcb6d-d46b-48d8-a26b-5677fc77c29c" });
const tableIdOrName = "developer_test_3";

module.exports = {
    hubspotClient,
    tableIdOrName
}