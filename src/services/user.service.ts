import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User | undefined;
  public rol: String | undefined;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  private _userList: User[] = [
    {
        rol:"proffesor",
        name:"Alumno",
        surname:"Apellido",
        birthdate:"11/01/2003",
        email:"a@a.com",
        sex:"masc",
        classes:"1ºA",
        password:"a"
    },
    {
        rol:"proffesor",
        name:"Alumno",
        surname:"Apellido",
        birthdate:"11/01/2003",
        email:"a@a.com",
        sex:"masc",
        classes:"1ºA",
        password:"a"
    },
    {
        rol:"proffesor",
        name:"Alumno",
        surname:"Apellido",
        birthdate:"11/01/2003",
        email:"a@a.com",
        sex:"masc",
        classes:"1ºA",
        password:"a"
    },
    {
        rol:"proffesor",
        name:"Alumno",
        surname:"Apellido",
        birthdate:"11/01/2003",
        email:"a@a.com",
        sex:"masc",
        classes:"1ºA",
        password:"a"
    },
  ]

  private _user:BehaviorSubject<User[]> = new BehaviorSubject(this._userList);
  public user$ = this._user.asObservable();

  login(email:string, password:string) {
    let head = new HttpHeaders({'x-api-key':'OpmTjbbI0u4qvjDyCODAy17wghfC6jpbAVdHM570', 'Content-Type':'application/json'});

    this.http.put('https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/logins', {
        "rol":"Login",
        "email":email,
        "password":password,
        "createUser": "False"
    } ,{ headers: head }).subscribe({
      next: (response: any) => {
        this.currentUser = response.user
    
        if (this.currentUser?.rol == "student") {
          this.router.navigate(['/chat']);
        } else {
          this.router.navigate(['/alumnos']);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  register(user:User) {
    let head = new HttpHeaders({'x-api-key':'OpmTjbbI0u4qvjDyCODAy17wghfC6jpbAVdHM570', 'Content-Type':'application/json'});

    this.http.put('https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/logins', {
      "name": (user.name + " " + user.surname) as string,
      "rol":user.rol as string,
      "sex":user.sex as string,
      "email":user.email as string,
      "classes":[user.classes] as string[],
      "birthdate":this.formatDate(new Date(user.birthdate)) as string,
      "password":user.password as string,
      "createUser": "True"
    } ,{ headers: head }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.router.navigate(['/chat']);
      },
      error: (err: any) => {
        console.log(err);
        this.router.navigate(['/chat']);
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