const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.get('/', (req, res)=>{
    res.send("Invalid Endpoint");
})

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
const port = 3000;
app.listen(port, ()=>{
    console.log("Server started on port " + port);
})
