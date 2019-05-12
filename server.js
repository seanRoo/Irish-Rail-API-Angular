const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const app = express();

app.use(cors());

app.use(express.static(__dirname + '/dist/irish-rail-api-app'));

app.use(bodyParser.json());
app.get('/*', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/irish-rail-api-app/index.html'));
    });



    
app.get('/trains/current', (req, res, next)=>{
    request({
        uri: 'http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML'
    }).pipe(res);
});
app.get('/stations/all', (req, res, nexr)=>{
    request({
        uri:'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML'
    }).pipe(res);
})
app.get('/stations/single/:name', (req, res, nexr)=>{
    request({
        uri:'http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc='+req.params.name
    }).pipe(res);
})
//const port = 3000;
app.listen(process.env.PORT);
