var express = require('express');
var router = express.Router();
const fileController = require('../public/controllers')

router.post('/upload', fileController.upload);

router.post('/download', fileController.download);

module.exports = router;