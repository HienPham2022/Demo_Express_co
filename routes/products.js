var express = require('express');
var router = express.Router();

router.get('/:id',(req,res)=>{
    res.send(req.params.id);
});

module.exports =router;