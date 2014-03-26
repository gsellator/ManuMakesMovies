var express = require('express');

// App Setup
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var sendWelcomeMail = function(locals){
    var path           = require('path')
    , templatesDir   = path.resolve(__dirname, '..', 'AdminDaily/templates')
    , emailTemplates = require('email-templates')
    , nodemailer     = require('nodemailer');

    emailTemplates(templatesDir, function(err, template) {

        if (err) {
            console.log(err);
        } else {

            // ## Send a single email

            // Prepare nodemailer transport object
            var transport = nodemailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: "manumakesmovies@gmail.com",
                    pass: "soldatryan&"
                }
            });

            // An example users object with formatted email function


            // Send a single email
            template('welcome', locals, function(err, html, text) {
                if (err) {
                    console.log(err);
                } else {
                    transport.sendMail({
                        from: 'Daily d\'initiés <contact@dailydinities.fr>',
                        to: locals.email,
                        subject: 'Bienvenue chez Daily d\'initiés !',
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

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(3020);
