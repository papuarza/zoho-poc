require('dotenv').config();

const Initializer = require("zcrmsdk/routes/initializer").Initializer;
const { OAuthToken, TokenType } = require("zcrmsdk/models/authenticator/oauth_token");
const UserSignature = require("zcrmsdk/routes/user_signature").UserSignature;
const { Logger, Levels } = require("zcrmsdk/routes/logger/logger");
const USDataCenter = require("zcrmsdk/routes/dc/us_data_center").USDataCenter;
const FileStore = require("zcrmsdk/models/authenticator/store/file_store").FileStore;
const RequestProxy = require("zcrmsdk/routes/request_proxy").RequestProxy;
const SDKConfigBuilder = require("zcrmsdk/routes/sdk_config_builder").MasterModel;
const {Currency} = require('./currency');


const empezar = async () => {
    let logger = Logger.getInstance(Levels.INFO, "./configs/nodejs_sdk_log.log");
    let user = new UserSignature("papu.arza@pulsak.com.py");
    let environment = USDataCenter.PRODUCTION();
    let resourcePath = "./configs/pulsak-crm.txt";
    let token = new OAuthToken(process.env.SELF_CLIENT_CLIENT_ID, process.env.SELF_CLIENT_CLIENT_SECRET, "", TokenType.GRANT, "https://zoho-crm-pulsak.herokuapp.com/redirect");
    console.log(token)
    let tokenstore = new FileStore("./configs/pulsak-crm.txt");
    let sdkConfig = new SDKConfigBuilder().setPickListValidation(false).setAutoRefreshFields(true).build();
    let proxy = new RequestProxy("proxyHost", 80);
    await Initializer.initialize(user, environment, token, tokenstore, sdkConfig, resourcePath, logger, proxy);
    // await Currency.getCurrencies();
}
  
empezar();

