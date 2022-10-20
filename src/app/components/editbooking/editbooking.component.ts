import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/httpservice.service';

@Component({
  selector: 'app-editbooking',
  templateUrl: './editbooking.component.html',
  styleUrls: ['./editbooking.component.css']
})
export class EditbookingComponent implements OnInit {

  show = new FormGroup({
    username:new FormControl('',Validators.required), 
    tickets:new FormControl('',Validators.required),
    show:new FormControl('',Validators.required),
    movie:new FormControl('',Validators.required),
  });

  constructor(private http:HttpserviceService,private router:Router) { }

  ngOnInit(): void {
  }

  // 
  onSubmit(){
    this.http.editBooking(this.http.curr_id,this.show.value).subscribe(data=>{
      console.log("booking data has been edited to ",data);
    })
  }

}
 