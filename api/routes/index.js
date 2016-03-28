var express = require('express');
var router = express.Router();

// Get a /test page
router.get('/test', function(req, res, next) {
    res.status(200).json({
        text: "this is only a test"
    });
});

module.exports = router;
