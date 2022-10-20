import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/httpservice.service';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.css']
})
export class AddShowComponent implements OnInit {

  show = new FormGroup({
    tickets:new FormControl('',Validators.required),
    timings:new FormControl('',Validators.required),
    theatre:new FormControl('',Validators.required),
  });

  constructor(private http:HttpserviceService) { }

  ngOnInit(): void {
  }

  // admin adding a show to a movie
  onSubmit(){
    // we fetch the movie by its id, then append the new show data to the list of shows of this movie.
    this.http.getMovieById(this.http.curr_id).subscribe((data: any)=>{
      data.details=[...data.details,this.show.value];
      this.http.updateMovie(this.http.curr_id,data).subscribe(data=> console.log("update data is : "));
    });
  }

}
 