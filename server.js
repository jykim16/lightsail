var express = require('express');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var app = express();
AWS.config.loadFromPath('./aws-config.json');

app.use(express.static(__dirname + '/client/dist'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());


var rek = new AWS.Rekognition();

// app.get('/', function (req, res) {
//   res.send('input a facebook id here.')
// });

app.get('/dopple', function(req, res) {
    //Docs on Rekognition API
    // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Rekognition.html

    console.log(req.body)
    var params =
        {
            Image: {
                S3Object: {
                    Bucket: "lightsailhackathon", //Bucket of choice.
                    Name: "Jonathan Kim.jpg"    //Image of choice.
                }
            }
        };

    rek.recognizeCelebrities(params, function(err, data) {
        if (err) {
            res.send(err.stack);
        } else {
            res.send(data);
        }
    });
});

app.listen(8080);
console.log('listening on 8080');
