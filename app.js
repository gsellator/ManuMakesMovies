var express = require('express'),
    mongoose = require('mongoose'),
    request = require('request'),
    model = require('./models/model');

var bddUri = 'mongodb://localhost/users';
var apiUri = 'http://127.0.0.1:3000';

mongoose.connect(bddUri, function (err, res) {
    if (err) { 
        console.log ('MSG01:ERROR connecting to: ' + bddUri + '. ' + err);
    } else {
        console.log ('MSG02:Succeeded connected to: ' + bddUri);
    }
});

// App Setup
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

// Helpers
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });
    return list;
}

function private(req, res, next) {
    var cookies = parseCookies(req);
    if ((cookies == undefined) || (cookies.access_token == undefined)) {
        res.redirect('/connexion');
    } else {
        console.log('MSG03:' + cookies.access_token);
        var options = {
            url: apiUri + '/me?access_token=' + cookies.access_token + '&app=AdminDaily',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET'
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {            
                var me = JSON.parse(body);
                console.log('MSG04:' + me);
                next();
            }
            else{
                res.redirect('/connexion');
            }
        }
        request(options, callback);
    }
}


// Routes
//app.get('/', function(req, res) {
//    res.writeHead(301, {Location: '/utilisateurs'});
//    res.end();
//});
//
//app.get('/connexion', public, function(req, res) {
//    res.render('login.ejs');
//});
//
//app.post('/connexion', function(req, res) {
//    var post_data = 'grant_type=password&username=' + req.body.username + '&password=' + req.body.password;
//    var options = {
//        url: apiUri + '/oauth/token',
//        headers: {
//            'Authorization': 'Basic OWgwMDo5aDAwYmlnc2VjcmV0',
//            'Content-Type': 'application/x-www-form-urlencoded',
//            'Content-Length': post_data.length
//        },
//        method: 'POST',
//        body: post_data
//    };
//    
//    function callback(error, response, body) {
//        if (!error && response.statusCode == 200) {
//            var token = JSON.parse(body);
//            console.log('MSG07:' + token);
//            if (req.body.rememberme!=undefined){
//                //TODO : Rendre ce cookie persistant
//                res.writeHead(302, {
//                    'Set-Cookie': 'access_token=' + token.access_token,
//                    'Content-Type': 'text/plain',
//                    'Location': '/utilisateurs'
//                });
//                res.end();
//            }
//            else{
//                res.writeHead(302, {
//                    'Set-Cookie': 'access_token=' + token.access_token,
//                    'Content-Type': 'text/plain',
//                    'Location': '/utilisateurs'
//                });
//                res.end();
//            }
//        }
//        else{
//            res.redirect('/connexion');
//        }
//    }
//    
//    request(options, callback);
//});
//
//app.get('/utilisateurs', private, function(req, res) {
//    model.getUsers(
//        function(result){
//            res.render('utilisateurs.ejs', {users: result});
//        }
//    );
//});
//
//app.post('/utilisateurs', function(req, res) {
//    model.createUser(
//        req.body,
//        function(){
//            res.redirect('/utilisateurs');
//            //res.redirect(res.get('referer'));
//        }
//    );
//});
//
//app.get('/bienvenue', private, function(req, res) {
//    res.render('welcome.ejs');
//});
//
app.get('/', function(req, res) {
    res.render('index.ejs');
});
//
//app.get('/ajouter', function(req, res) {
//    res.render('create.ejs');
//});
//
//app.get('/modifier/:id', function(req, res) {
//    model.getUserFromId(
//        req.params.id,
//        function(result){
//            res.render('update.ejs', {user: result});
//        }
//    );
//});
//
//app.post('/modifier/:id', function(req, res) {
//    model.updateUser(
//        req.params.id,
//        req.body,
//        function(){
//            res.redirect('/utilisateurs');
//        }
//    );
//});
//
//
//app.get('/supprimer/:id', function(req, res) {
//    model.deleteUser(
//        req.params.id,
//        function(){
//            res.redirect('/utilisateurs');
//        }
//    );
//});
//
//app.get('/deconnexion', function(req, res) {
//    res.writeHead(302, {
//        'Set-Cookie': 'access_token=""',
//        'Content-Type': 'text/plain',
//        'Location': '/connexion'
//    });
//    res.end();
//});
//
//app.post('/bling', function(req, res) {
//    model.createAuthorization(
//        "",
//        function(){
//            res.redirect('/utilisateurs');
//        }
//    );
//});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(3020);
