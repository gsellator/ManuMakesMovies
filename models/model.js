
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    model = module.exports;

var apiUri = 'http://127.0.0.1:3000/';

// Schemas definitions
var OAuthAccessTokensSchema = new Schema({
    access_token: { type: String },
    client_id: { type: String },
    user_id: { type: String },
    expires: { type: Date }
});

var OAuthRefreshTokensSchema = new Schema({
    refresh_token: { type: String },
    client_id: { type: String },
    user_id: { type: String },
    expires: { type: Date }
});

var OAuthClientsSchema = new Schema({
    client_id: { type: String },
    client_secret: { type: String },
    redirect_uri: { type: String }
});

var OAuthUsersSchema = new Schema({
    username: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, default: '' }
});

var OAuthAuthorizationsSchema = new Schema({
    userId: { type: String },
    application: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    role: { type: String }
});

mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
mongoose.model('OAuthClients', OAuthClientsSchema);
mongoose.model('OAuthUsers', OAuthUsersSchema);
mongoose.model('OAuthAuthorizations', OAuthAuthorizationsSchema);

var OAuthAccessTokensModel = mongoose.model('OAuthAccessTokens'),
    OAuthRefreshTokensModel = mongoose.model('OAuthRefreshTokens'),
    OAuthClientsModel = mongoose.model('OAuthClients'),
    OAuthUsersModel = mongoose.model('OAuthUsers'),
    OAuthAuthorizationsModel = mongoose.model('OAuthAuthorizations');


// CRUD User
model.createUser = function (user, callback) {
    var newUser = new OAuthUsersModel({
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    });
    newUser.save(callback);
};

model.getUser = function (username, password, callback) {
    OAuthUsersModel.findOne({"username": username, "password": password}, function (err, result) {
        if (err) { throw err; }
        callback(result);
    });
};

model.getUserFromId = function (id, callback) {
    OAuthUsersModel.findOne({"_id": id}, function (err, result) {
        if (err) { throw err; }
        callback(result);
    });
};

model.getUsers = function (callback) {
    OAuthUsersModel.find({}, function (err, result) {
        if (err) { throw err; }
        callback(result);
    });
};

model.updateUser = function (id, user, callback) {
    var newUser = new OAuthUsersModel({
        _id: id,
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    });
    newUser.update(callback);
};

model.deleteUser = function (id, callback) {
    OAuthUsersModel.remove({"_id": id}, function (err, result) {
        if (err) { throw err; }
        callback(result);
    });
};


// CRUD Authorization
model.createAuthorization = function (authorization, callback) {
    var newAuthorization = new OAuthAuthorizationsModel({
        userId: "5314597f2298224c054191f0",
        application: "AdminDaily",
        startDate: "",
        endDate: "",
        role: ""
    });
    newAuthorization.save(callback);
};

model.getAuthorization = function (userId, application, callback) {
    OAuthAuthorizationsModel.findOne({"userId": userId, "application": application}, function (err, result) {
        if (err) { throw err; }
        callback(result);
    });
};






//model.getClient = function (clientId, clientSecret, callback) {
//    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');    
//    OAuthClientsModel.findOne({ client_id: clientId, client_secret: clientSecret }, callback);
//};



