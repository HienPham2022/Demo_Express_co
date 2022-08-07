const express = require('express');
const app = express();
//body-parser query
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// midlleware
function midlleware(req,res,next){
    console.log('hello my midlleware');
    res.locals.message ="my message";
    next();
}
app.use(midlleware);

//express static
app.use(express.static(__dirname + '/public'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js',express.static(__dirname+ '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js',express.static(__dirname + '/node_modules/popper.js/dist'));

//handlebars
var hbs = require('express-handlebars');
app.engine('hbs',hbs.engine({
    extname:'hbs',
    defaultLayout:'layout',
    layoutDir:__dirname + '/views/layouts',
    partialDir:__dirname + '/views/partials'

}));
app.set('view engine','hbs');

app.get('/test',(req,res)=>{
    //cach 1:
    // res.locals.name = "John";
    // res.locals.location = "canada";
    // cach 2:
    var context = {
        name: '<b>Marry</b>',//dùng {{{}}}
        location:'chicago',
        // dùng if {{#if}}
        user: {
            islogin:false,
            address:{
                city:'HCM',
                street:'572 nguyen trung truc'
            }
        },
        language :['vietnamese','Eng','japan'],
        links :[{
            title:'Home',
            url: '/'
        },
        {
            title:'products',
            url: '/products'
        }
    ]
    };
    res.render('index',context);
});

// html escape 


app.get('/',(req,res)=>{
    res.send('hello world '+res.locals.message);
});
app.get('/json',(req,res)=>{
    var json ={
        name:'hien',
        age:18
    };
    res.json(json);
})
//express router
var productRouter = require('./routes/products');
app.use('/product',productRouter);


var abc = require('./routes/abc');
app.use('/abc',abc);

app.get('/name/:name_pro/id/:id_pro',(req,res)=>{
    res.send(req.params);
});
// query string
app.get('/process',(req,res)=>{
    console.log(req.query);
    res.send("hello"+req.query.name);
});
// post
app.post('/process',(req,res)=>{
    console.log(req.body);
    res.send("hello" +req.body.name);
})


//handle 404 not found
app.use((req,res)=>{
    res.status(404).send('ERROR:Request not found');

});
app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).send('Error:internal server Error');
})



app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'),()=>{
    console.log(`server is listening on port ${app.get('port')} `);
})



