import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpResponse,HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private httpClient:HttpClient){}

  private mainURL:string='http://localhost:8080';
  private getUrl:string = this.mainURL + '/room/reservation/v1/';
  private postUrl:string = this.mainURL + '/room/reservation/v1';
  public submitted!:boolean;
  roomsearch! : FormGroup;
  rooms! : Room[];
  request!:ReserveRoomRequest;
  checkIn!:string;
  checkOut!:string;
  msg: string[] = [];

  ngOnInit(){
    this.roomsearch= new FormGroup({
      checkin: new FormControl(' '),
      checkout: new FormControl(' ')
    });

    const changes$ = this.roomsearch.valueChanges;

    changes$.subscribe(x => {
      this.checkIn = x.checkin;
      this.checkOut = x.checkout;
    });

    this.getMsg().subscribe(data => this.msg = data);
  }

  onSubmit({value,valid}:{value:Roomsearch,valid:boolean}){
    this.getAll().subscribe(
      rooms => {console.log(Object.values(rooms)[0]);this.rooms=<Room[]>Object.values(rooms)[0]; }
    );
  }

  reserveRoom(value:string){
    this.request = new ReserveRoomRequest(value, this.checkIn, this.checkOut);
    this.createReservation(this.request);
  }

  createReservation(body:ReserveRoomRequest) {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({'Content-Type': 'application/json'});

    const options = {
      headers: new HttpHeaders().append('key', 'value'),
    }

    this.httpClient.post(this.postUrl, body, options)
      .subscribe(res => console.log(res));
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.mainURL + '/room/reservation/v1?checkin='+ this.checkIn + '&checkout='+this.checkOut, {responseType: 'json'});
  }

  getMsg(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.mainURL + '/welcome');
  }
}

export interface Roomsearch{
  checkin:string;
  checkout:string;
}

export interface Room{
  id:string;
  roomNumber:string;
  price:string;
  links:string;
}

export class ReserveRoomRequest {
  roomId:string;
  checkin:string;
  checkout:string;

  constructor(roomId:string, checkin:string, checkout:string) {
    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}
