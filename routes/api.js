//----Modules and configuration----//
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/APIController')

//----API----//
router.route('/')
    //Read Publish Table
    .get(apiController.readPublishTable)
    //Create row in a Draft Table
    .post(apiController.newRowDraftTable)
    //Update row in a Draft Table
    .patch(apiController.updateRowDraftTable)
    //Delete row in a Draft table
    .delete(apiController.deleteRowDraftTable);

router.route('/:id')
    //Update row in a Draft Table with Id parameter
    .patch(apiController.updateRowIdParameter)
    //Delete row in a Draft table with Id parameter
    .delete(apiController.deleteRowIdParameter);

//Read Draft Table
router.get('/draft', apiController.readDraftTable);

//Publish Draft Table
router.post('/publish', apiController.publishDraftTable);

module.exports = router;