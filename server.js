var express = require('express');
var AWS = require('aws-sdk');
var app = express();

//Pull credentials/regions from config
AWS.config.loadFromPath('./aws-config.json');

var rek = new AWS.Rekognition();

app.get('/', function (req, res) {
    res.send('Welcome to your app! Try visiting "/detectExample" to see a Rekognition result.')
});

app.get('/detectExample', function(req, res) {
    //Docs on Rekognition API
    // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Rekognition.html
    var params =
        {
            Image: {
                S3Object: {
                    Bucket: "lightsailhackathon", //Bucket of choice.
                    Name: "10379167.jpeg"    //Image of choice.
                }
            },
            MaxLabels: 100,
            MinConfidence: 10
        };

    rek.detectLabels(params, function(err, data) {
        if (err) {
            res.send(err.stack);
        } else {
            res.send(data);
        }
    });
});

app.listen(3000);
console.log('listening on 3000');
