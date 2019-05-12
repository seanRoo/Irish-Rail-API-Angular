import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Parser } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(
    private httpClient: HttpClient,
    private http: Http) { }

  getAllTrainData(){
    return this.http.get("http://localhost:3000/trains/all")
    .pipe(map(res=>res.text()));
  }
  getAllStations(){
    return this.http.get("http://localhost:3000/stations/all")
    .pipe(map(res=>res.text()));
  }
  getStationDataByName(name){
    return this.http.get("http://localhost:3000/stations/single/"+name)
    .pipe(map(res=>res.text()));
  }
}
