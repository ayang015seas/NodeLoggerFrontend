const express = require('express')
const app = express()
const port = 3001
const winston = require('winston')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const Logger = require('./logger_service')
const logger = new Logger('app');
const cors = require('cors');
const fs = require('fs');

app.use(cors());

// example log object
var obj = [ { labels: 
     { alertname: 'InstanceDown',
       instance: '192.168.108.13:8080',
       job: 'custom',
       severity: 'critical' },
    annotations: 
     { description: '192.168.108.13:8080 of job custom has been down for more than 1 minute.',
       title: 'Instance 192.168.108.13:8080 down' },
    startsAt: '2020-06-16T14:58:23.326990857Z',
    endsAt: '2020-06-16T15:01:23.326990857Z',
    generatorURL: 'http://alex-VirtualBox:9090/graph?g0.expr=up+%3D%3D+0&g0.tab=1' } 
]


 app.post('/api/v1/alerts', function(req, res) {
  console.log(req.body);
  logger.error(JSON.stringify(createMSG(req.body)));
  res.send(200);
})

 app.get('/', async function (req, res) {
    var rawdata = await fs.readFileSync('app.log');
    var finalArray = [];
    fs.readFile("app.log", "utf-8", function(err, data) {
      var temp = data.split('\n');
      for (log in temp) {

        try {
          // console.log(JSON.stringify(temp[log]));
          finalArray.push(temp[log].replace(/\\/g, ''));
        } 
        catch (err) {
          console.log("ERROR")
        }
      }
      // console.log(obj[0]);
      res.send(finalArray);
    });

    console.log(rawdata);
    // res.send("Server Up");
 })


console.log(JSON.stringify(createMSG(obj)));
logger.info(JSON.stringify(createMSG(obj)));

// start app 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

/*
  Function to put information into a well-formatted string
*/

function createMSG(msg) {
  msg = msg[0];
  var message = ""
  message += "[" + msg.startsAt + "]"
  message += ""
  message += "--"
  message += msg.labels.severity.toUpperCase()
  message += "--"
  message += msg.labels.alertname
  message += "/"
  message += msg.labels.instance 
  message += " "
  message += msg.annotations.description
  return message
}