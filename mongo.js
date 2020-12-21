var mongoose = require("mongoose");

var env = process.env.NODE_ENV || 'development';

var config = require('./config/mongo');

module.exports = () => {
    var envUrl = process.env[config.use_env_variable];

    var localUrl = `mongodb://${config.host}/${config.database}`;
    console.log(localUrl)
    var mongoUrl = envUrl ? envUrl : localUrl;
    return mongoose.connect(mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true});
};