import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/httpservice.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private httpservice : HttpserviceService,private router: Router,private httpClient:HttpClient) { }

  list:any=[];

  isadmin:Boolean=false;
  hasloggedin:Boolean=false;

  baseURL = "https://633fab20e44b83bc73beda4e.mockapi.io/anime";

  ngOnInit(): void {
      this.httpservice.getMovies().subscribe(
        (anime)=>{
          console.log(anime);
          this.list=anime;
        });
      this.isadmin=localStorage.getItem("isAdmin")==='true';
      this.hasloggedin=localStorage.getItem("isUser")==='true';
  }

  // can be operated by a user
  Book(idx:any){
    console.log(idx);
    this.httpservice.curr_id=idx.id;
    this.router.navigate(['/book-tickets']);
  }

  // can be done by admin only
  Edit(idx:any){
    console.log("edit this:",idx.id);
    this.httpservice.curr_id=idx.id;
    this.router.navigate(['add-show']);
  }

  // can be done by admin only
  remove(idx:any){
    console.log("deleting this element:",idx.id);
    this.httpservice.deleteMovie(idx.id).subscribe((data)=>console.log(data,"has been deleted altogether"));
  }


}
 