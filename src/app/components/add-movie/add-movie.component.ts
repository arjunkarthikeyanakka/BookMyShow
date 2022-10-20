import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/httpservice.service';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movie = new FormGroup({
    name:new FormControl('',Validators.required),
    rating:new FormControl('',Validators.required),
    poster:new FormControl('',Validators.required),
    tickets:new FormControl('',Validators.required),
  });

  constructor(private httpservice : HttpserviceService) { }

  ngOnInit(): void {
    
  }

  // adding movie from formGroup data collected by admin input
  onSubmit(){
    this.httpservice.addMovie(this.movie.value).subscribe(data=>console.log("added this movie to the api:",this.movie.value));
  }

}
 