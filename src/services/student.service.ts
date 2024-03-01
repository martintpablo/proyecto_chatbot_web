import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

    private _userList: User[] = [
        {
            role:"proffesor",
            name:"Alumno",
            surname:"Apellido",
            birthdate:"11/01/2003",
            email:"a@a.com",
            gender:"masc",
            class:"1ºA",
            password:"a"
        },
        {
            role:"proffesor",
            name:"Alumno",
            surname:"Apellido",
            birthdate:"11/01/2003",
            email:"a@a.com",
            gender:"masc",
            class:"1ºA",
            password:"a"
        },
        {
            role:"proffesor",
            name:"Alumno",
            surname:"Apellido",
            birthdate:"11/01/2003",
            email:"a@a.com",
            gender:"masc",
            class:"1ºA",
            password:"a"
        },
        {
            role:"proffesor",
            name:"Alumno",
            surname:"Apellido",
            birthdate:"11/01/2003",
            email:"a@a.com",
            gender:"masc",
            class:"1ºA",
            password:"a"
        },
      ]

  private _user:BehaviorSubject<User[]> = new BehaviorSubject(this._userList);
  public user$ = this._user.asObservable();

}