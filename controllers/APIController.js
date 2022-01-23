//----Modules and configuration----//
const {hubspotClient, tableIdOrName}  = require('../model/hubDB')

//Read Publish Table
const readPublishTable = async (req, res) => {
    try {
        const apiRes = await hubspotClient.cms.hubdb.rowsApi.getTableRows(tableIdOrName);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
};

//Create row in a Draft Table
const newRowDraftTable = async (req, res) => {
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
        res.status(201).json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
};

//Update row in a Draft Table
const updateRowDraftTable = async (req, res) => {
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

        const rowId = req.body.id;
        const apiRes = await hubspotClient.cms.hubdb.rowsApi.updateDraftTableRow(tableIdOrName, rowId, HubDBRowRequest);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
};

//Delete row in a Draft table
const deleteRowDraftTable = async (req, res) => {
    try {
        const rowId = req.body.id;
        const apiRes = await hubspotClient.cms.hubdb.rowsApi.purgeDraftTableRow(tableIdOrName, rowId);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
};

//Update row in a Draft Table with Id parameter
const updateRowIdParameter = async (req, res) => {
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
};

//Delete row in a Draft table with Id parameter
const deleteRowIdParameter = async (req, res) => {
    try {
        const rowId = req.params.id;
        const apiRes = await hubspotClient.cms.hubdb.rowsApi.purgeDraftTableRow(tableIdOrName, rowId);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
};

//Read Draft Table
const readDraftTable = async (req, res) => {
    try {
        const apiRes = await hubspotClient.cms.hubdb.rowsApi.readDraftTableRows(tableIdOrName);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
};

//Publish Draft Table
const publishDraftTable = async (req, res) => {
    try {
        const apiRes = await hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableIdOrName);
        res.json(apiRes.body);
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e);
    }
};

module.exports = {
    readPublishTable,
    newRowDraftTable,
    updateRowDraftTable,
    deleteRowDraftTable,
    updateRowIdParameter,
    deleteRowIdParameter,
    readDraftTable,
    publishDraftTable
}