const express = require('express');
const router_abc = express.Router();

router_abc.get('/abc',(req,res)=>{
    res.send('hello from abc');
});
router_abc.get('/ab*cd',(req,res)=>{
    res.send('/abcd hoac cd');
});
router_abc.get('/ab([*])cd',(req,res)=>{
    res.send('ad*cd');
});
module.exports = router_abc;