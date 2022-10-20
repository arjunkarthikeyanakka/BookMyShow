import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/httpservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent implements OnInit {

  user = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    cpassword : new FormControl('',Validators.required),
  });

  constructor(private http:HttpserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.user.get('password')?.value===this.user.get('cpassword')?.value){
      this.http.addUser(this.user.value).subscribe(data=>console.log("posted new user info!",data));
      localStorage.setItem("isUser","true");
      let name:any = this.user.get('username')?.value;
      localStorage.setItem("username",name);
      // window.location.reload();
      this.router.navigate(['/home']);
    }else{
      alert("passwords do not match!!!");
    }
  }

}
 