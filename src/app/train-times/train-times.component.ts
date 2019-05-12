import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import {TrainService} from '../services/train.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable, interval } from 'rxjs';
//declare var require: any
var convert = require('xml2js');

@Component({
  selector: 'app-train-times',
  templateUrl: './train-times.component.html',
  styleUrls: ['./train-times.component.css']
})
export class TrainTimesComponent implements OnInit {

  trainData: any;
  text: string;
  dataString: string = "";
  stations = [];
  selected: string = "Select Station";
  singleStation = [];
  singleStationXML: any;
  destinations = [];
  arriving = [];
  departing = [];
  lastLocations = [];
  terminationTimes = [];
  origins = [];
  status = [];
  trainTypes = [];
  stationData: any;
  sub:Subscription;

  //items: any;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private trainService: TrainService) { }

  ngOnInit() {

    if(this.selected!= "Select Station"){
      this.sub = interval(20000).subscribe(data=>{
          this.getStationByName();
        })
    }
  }
  stopRefreshing(){
    alert("Unsubscribing...");
    this.sub.unsubscribe();
  }

  getAllTrainData(){
    this.trainService.getAllTrainData().subscribe(data=>{
      this.text = data;
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(this.text, "text/xml");
      let messages = xmlDoc.getElementsByTagName("PublicMessage");
      for(var i =0; i<messages.length; i++){
        this.dataString += messages[i].childNodes[0].nodeValue + "<br>";
      }
      this.trainData = this.dataString;
    })
  }
  getAllStations(){
    alert("Stations Loaded");
    this.trainService.getAllStations().subscribe(data=>{
      this.text = data;
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(this.text, "text/xml");
      let stationsParsed = xmlDoc.getElementsByTagName("StationDesc");
      //console.log(stationsParsed);
      for(var i =0; i<stationsParsed.length; i++){
        this.stations.push(stationsParsed[i].innerHTML);
      }
      this.stations.sort();
      
    })
  }
  getStationByName(){
    var digitSearch = /\d+/;
    this.destinations = [];
    this.lastLocations = [];
    this.origins = [];
    this.terminationTimes = [];
    this.status = [];
    this.singleStation = [];
    this.trainTypes = [];
    //console.log(this.selected);
    this.trainService.getStationDataByName(this.selected).subscribe(data=>{
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data, "text/xml");
    this.stationData = xmlDoc.getElementsByTagName("objStationData");
    console.log(this.stationData);

  for(var i = 0; i<this.stationData.length; i++){
    this.destinations.push(xmlDoc.getElementsByTagName("Destination")[i]);
    if(xmlDoc.getElementsByTagName("Lastlocation")[i].innerHTML == ""){
      xmlDoc.getElementsByTagName("Lastlocation")[i].innerHTML="Yet to depart";
      this.lastLocations.push(xmlDoc.getElementsByTagName("Lastlocation")[i]);
    }
    else{
      this.lastLocations.push(xmlDoc.getElementsByTagName("Lastlocation")[i]);
    }
    this.origins.push(xmlDoc.getElementsByTagName("Origin")[i]);
    this.terminationTimes.push(xmlDoc.getElementsByTagName("Destinationtime")[i]);
    this.status.push(xmlDoc.getElementsByTagName("Late")[i]);
    this.trainTypes.push(xmlDoc.getElementsByTagName("Traintype")[i]);
    this.departing.push(xmlDoc.getElementsByTagName("Expdepart")[i]);
    console.log(this.status[i].innerHTML.toString().search(digitSearch));
  }
    })
  }
  selectedOption(text){
    this.selected = text;
    this.getStationByName();
  }
  
}
