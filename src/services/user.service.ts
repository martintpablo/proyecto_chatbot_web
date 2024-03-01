import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User | undefined;
  public role: String | undefined;

  constructor(
    private http: HttpClient
  ) {

  }

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

  login(email:string, password:string) {
    let head = new HttpHeaders({'x-api-key':'OpmTjbbI0u4qvjDyCODAy17wghfC6jpbAVdHM570', 'Content-Type':'application/json'});

    this.http.get('https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/' ,{ headers: head }).subscribe({
      next: (response: any) => {
        this.currentUser = response
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  register(user:User) {
    let head = new HttpHeaders({'x-api-key':'OpmTjbbI0u4qvjDyCODAy17wghfC6jpbAVdHM570', 'Content-Type':'application/json'});

    this.http.put('https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/logins', {
      name:user.name,
      role:user.role,
      surname:user.surname,
      gender:user.gender,
      email:user.email,
      class:user.class,
      birthdate:this.formatDate(new Date(user.birthdate)),
      password:user.password,
      createUser: "True"
    } ,{ headers: head }).subscribe({
      next: (response: any) => {
        
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}