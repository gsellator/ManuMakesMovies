var express = require('express');

// App Setup
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
var fs = require('fs');
var mailpass = __dirname + '/.accounts';

//Helpers
var getMailCredentials = function(callback){
    //Read Login & password of the gmail account sending this mail in '/.accounts'
    fs.readFile(mailpass, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        var account = {};
        data = JSON.parse(data);
        account.username = data.prod.username;
        account.password = data.prod.password;
        callback(account);
    });
}


var sendWelcomeMail = function(account, locals){
    var path           = require('path')
    , templatesDir   = path.resolve(__dirname, '..', 'ManuMakesMovies/templates')
    , emailTemplates = require('email-templates')
    , nodemailer     = require('nodemailer');

    emailTemplates(templatesDir, function(err, template) {
        if (err) {
            console.log(err);
        } else {
            var transport = nodemailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: account.username,
                    pass: account.password
                }
            });
            template('welcome', locals, function(err, html, text) {
                if (err) {
                    console.log(err);
                } else {
                    transport.sendMail({
                        from: 'ManuMakesMovies <manumakesmovies@gmail.com>',
                        to: 'Manu <manu@manumakesmovies.com>',
                        subject: 'Message from ' + locals.email,
                        html: html,
                        // generateTextFromHTML: true,
                        text: text
                    }, function(err, responseStatus) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(responseStatus.message);
                        }
                    });
                }
            });
        }
    });
};

//Routes
app.get('/', function(req, res) {
    if (req.param('msg')==1) { 
        res.render('index.ejs', {noty: ['Votre message a bien été envoyé !']});
    } else {
        res.render('index.ejs', {noty: []});
    }
});

app.post('/', function(req, res) {
    console.log(req.body.email);
    console.log(req.body.message);
    var msg = req.body.message;
    msg = msg.replace(/\r?\n/g, '<br />');

    var locals = {
        email: req.body.email,
        message: msg
    };

    getMailCredentials(function(account){
        sendWelcomeMail(account, locals);
    });

    res.redirect('/?msg=1');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(3020);