const express = require('express');
const morgan = require('morgan');
const app = express()
const bodyParser = require('body-parser')
const productRoutes = require('./api/routes/product.routes')
const mongoose = require('mongoose');
const Product = require('./api/model/product.model');

// Configuring the database
const dbConfig = require('./config.js');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// Set up mongoose connection

// let mongodbUri ='mongodb://@ds245277.mlab.com:45277/lms';

// mongoose.connect(mongodbUri, {
//   useNewUrlParser: true,
//   auth: {
//     user: 'iqraabdulrauf',
//     password: 'efg01@Was'
//   }
// })
// let conn = mongoose.connection;    
// conn.on('error', console.error.bind(console, 'connection error:'));  

// conn.once('open', () =>{
//  console.log('connected to database')                       
// });

app.listen(3000, () => {
    console.log('Server is up and running on port number ' + 3000);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/products', productRoutes);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Acess-Control-Allow-Methods", 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({});

    }
})
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
    next(error);
});
module.exports = app;