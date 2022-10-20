import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpserviceService } from './httpservice.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string = 'bookmyshow';
  isadmin:Boolean = false;
  isuser:Boolean=false;
  
  constructor(private http:HttpserviceService, private router: Router) {}

  ngOnInit(): void {
    // console.log("inside app ts");
    this.isadmin=localStorage.getItem("isAdmin")==='true';
    this.isuser=localStorage.getItem("isUser")==='true';
    this.router.navigate(['/home']);
  }

  logout(){
    // window.location.reload();
    // console.log("logout");
    if(this.isadmin){
      localStorage.setItem("isAdmin","false");
      this.isadmin=false;
    }else{
      localStorage.setItem("isUser","false");
      this.isuser=false;
    }
    localStorage.removeItem("username");
    this.router.navigate(['/login']);
  }

}
