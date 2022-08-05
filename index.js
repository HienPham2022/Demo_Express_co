const express = require('express');
const app = express();
app.get('/',(req,res)=>{
    res.send('hello world')
});
app.get('/abc',(req,res)=>{
    res.send('hello from abc');
});
app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
    console.log(`server is listening on port ${app.get('port')} `);
})
