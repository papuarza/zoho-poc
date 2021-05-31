require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const Initializer = require( "zcrmsdk/routes/initializer").Initializer;
const {OAuthToken, TokenType} = require( "zcrmsdk/models/authenticator/oauth_token");
const UserSignature = require( "zcrmsdk/routes/user_signature").UserSignature;
const {Logger, Levels} = require( "zcrmsdk/routes/logger/logger");
const USDataCenter = require( "zcrmsdk/routes/dc/us_data_center").USDataCenter;
const DBStore = require( "zcrmsdk/models/authenticator/store/db_store").DBStore;
const FileStore = require( "zcrmsdk/models/authenticator/store/file_store").FileStore;
const RequestProxy = require("zcrmsdk/routes/request_proxy").RequestProxy;
const SDKConfigBuilder = require("zcrmsdk/routes/sdk_config_builder").MasterModel;



mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


const index = require('./routes/index');
app.use('/', index);


module.exports = app;
