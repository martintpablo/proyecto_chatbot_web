import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _userList: User[] = [
    {
        id:"0",
        prof:false,
        name:"Alumno",
        surname:"Apellido",
        birthdate:"11/01/2003",
        email:"a@a.com",
        gender:"masc",
        class:"1ºA"
    },
    {
        id:"1",
        prof:false,
        name:"Alumno",
        surname:"Apellido",
        birthdate:"11/01/2003",
        email:"a@a.com",
        gender:"masc",
        class:"1ºA"
    },
    {
        id:"2",
        prof:false,
        name:"Alumno",
        surname:"Apellido",
        birthdate:"11/01/2003",
        email:"a@a.com",
        gender:"masc",
        class:"1ºA"
    }
  ]

  private _user:BehaviorSubject<User[]> = new BehaviorSubject(this._userList);
  public user$ = this._user.asObservable();

}