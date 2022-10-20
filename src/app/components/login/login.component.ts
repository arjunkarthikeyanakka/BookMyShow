import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService } from 'src/app/httpservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  });

  constructor(private httpService : HttpserviceService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let user_not_found:Boolean=true;
    this.httpService.getUsers().subscribe(data=>{
      for(let i of data){
        if(this.user.get('username')?.value==i.username&&this.user.get("password")?.value==i.password){
          user_not_found=false;
          // if it is admin
          if(this.user.get('username')?.value==="admin") {
            console.log("logged in as admin");
            localStorage.setItem("isAdmin","true");
            window.location.reload();
            this.router.navigate(['/home']);
          }else{
            console.log("logged in as user");
            localStorage.setItem("isUser","true");
            window.location.reload();
            this.router.navigate(['/home']);
          }
          localStorage.setItem("username",i.username);
          break;
        }
      }
      if(user_not_found) {
        alert("wrong username or password!");
        localStorage.removeItem("isUser");
        localStorage.removeItem("isAdmin");
        window.location.reload();
      }
    });
  }

}
 