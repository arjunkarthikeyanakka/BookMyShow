import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/httpservice.service';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {

  bookingform = new FormGroup({
    quantity : new FormControl('',Validators.required)
  })
  movie:any = []

  constructor(private http:HttpserviceService, private router:Router) { }

  // we fetch the data of the current movie clicked by user, we display all its data 
  ngOnInit(): void {
    this.http.getMovieById(this.http.curr_id).subscribe(
      (anime)=>{
        console.log(anime);
        this.movie=anime;
      });
      console.log("id is : ",this.http.curr_id);
  }

  // number of tickets are validated and then bookings api is updated
  bookTickets(idx:any){
    console.log(idx," is booked",this.movie.details[idx]);
    let tickets_left = this.movie.details[idx].tickets;
    let demand:any = this.bookingform.get("quantity")?.value;
    if(tickets_left < demand || demand==0){
      alert(`Only ${tickets_left} tickets are available`);
    }else{
      tickets_left-=demand;
      this.movie.details[idx].tickets=tickets_left;
      let obj = {
        username : localStorage.getItem("username"),
        movie : this.movie.name,
        show : this.movie.details[idx].timings,
        tickets : demand,
      }
      // console.log(idx,this.movie,this.http.curr_id);
      this.http.updateMovie(this.http.curr_id,this.movie).subscribe(data=> console.log("update data is : ",this.movie));
      this.http.addToBookings(obj).subscribe(data=>console.log("added this booking data to api : ",data));
      // window.location.reload();
    }
  }

}
 