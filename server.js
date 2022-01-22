//----Modules and configuration----//
const express = require('express');
const hubspot = require('@hubspot/api-client');

const app = express();
app.set('port', process.env.PORT || 3000);

const hubspotClient = new hubspot.Client({"apiKey":"4c6dcb6d-d46b-48d8-a26b-5677fc77c29c"});
const tableIdOrName = "developer_test_3";

//----Midlewares----//
app.use(express.json());

//----Routes----//

//Create row in a Draft Table
app.post('/', async (req, res) => {
    try {
        const values = {
            "name": req.body.name,
            "last_name": req.body.last_name,
            "document_id": req.body.document_id
        };

        const HubDBRowRequest = {
            path: null,
            name: null,
            childTableId: 0,
            values
        };

        const apiRes = await hubspotClient.cms.hubdb.rowsApi.createTableRow(tableIdOrName, HubDBRowRequest);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
});

//Read Publish Table
app.get('/', async (req, res) => {
    try {
        const apiRes = await hubspotClient.cms.hubdb.rowsApi.getTableRows(tableIdOrName);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
});

//Read Draft Table
app.get('/draft', async (req, res) => {
    try {
        const apiRes = await hubspotClient.cms.hubdb.rowsApi.readDraftTableRows(tableIdOrName);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
});

//Update row in a Draft Table
app.patch('/:id', async (req, res) => {
    try {
        const values = {
            "name": req.body.name,
            "last_name": req.body.last_name,
            "document_id": req.body.document_id
        };

        const HubDBRowRequest = {
            path: null,
            name: null,
            childTableId: 0,
            values
        };

        const rowId = req.params.id;
        const apiRes = await hubspotClient.cms.hubdb.rowsApi.updateDraftTableRow(tableIdOrName, rowId, HubDBRowRequest);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
});

//Delete row in a Draft table
app.delete('/:id', async (req, res) => {
    try {
        const rowId = req.params.id;
        const apiRes = await hubspotClient.cms.hubdb.rowsApi.purgeDraftTableRow(tableIdOrName, rowId);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
});

//Publish Table
app.post('/publish', async (req, res) => {
    try {
        const apiRes = await hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableIdOrName);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
});

//----Server Running----//
app.listen(app.get('port'), () => {
    console.log('Server running on port',app.get('port'));
});