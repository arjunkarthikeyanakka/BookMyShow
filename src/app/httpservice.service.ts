import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  
  constructor(private httpClient: HttpClient) { }

  movieURL:string = "https://633fab20e44b83bc73beda4e.mockapi.io/movie";
  usersURL:string = "https://633fab20e44b83bc73beda4e.mockapi.io/users";
  bookingURL:string = "https://633fab20e44b83bc73beda4e.mockapi.io/bookings";
  // isAdmin:Boolean = false;
  // isUser:Boolean = false;
  curr_id:Number = 1;

  // get list of all movies
  getMovies(): Observable<any>{
    return this.httpClient.get(this.movieURL);
  }

  // post a movie to the movie list api
  addMovie(movie:any): Observable<any>{
    return this.httpClient.post(this.movieURL,movie,{
      headers:{
      "Content-type":"application/json"
    }});
  }

  // admin deletes a movie onclick
  deleteMovie(id:Number): Observable<any>{
    let url = this.movieURL+'/'+id;
    return this.httpClient.delete(url);
  }

  // get all the users who made an account for this website
  getUsers():Observable<any>{
    return this.httpClient.get(this.usersURL);
  }

  // get movie details by id
  getMovieById(idx:Number): Observable<any>{
    return this.httpClient.get(this.movieURL+'/'+idx);
  }

  // add a new registered user's data to user list api
  addUser(user:any): Observable<any>{
    return this.httpClient.post(this.usersURL,user,{
      headers:{
        "Content-Type":"application/json"
      }
    });
  }

  // when admin adds a show of a movie we push it to the api
  updateMovie(idx:Number,movie:any): Observable<any>{
    return this.httpClient.put(this.movieURL+'/'+idx,JSON.stringify(movie),{
      headers:{
        "Content-Type":"application/json"
      }
    });
  }

  // when a user books a show, data is pushed to api
  addToBookings(booking:any): Observable<any>{
    return this.httpClient.post(this.bookingURL,JSON.stringify(booking),{
      headers:{
        "Content-Type":"application/json"
      }
    });
  }

  removeBooking(idx:Number): Observable<any>{
    return this.httpClient.delete(this.bookingURL+'/'+idx);
  }

  // get all the user bookings made so far
  getBookings(): Observable<any>{
    return this.httpClient.get(this.bookingURL);
  }

  // edit a user's booking data 
  editBooking(idx:Number,bookingdata:any): Observable<any>{
    return this.httpClient.put(this.bookingURL+'/'+idx,bookingdata,{
      headers:{
        "Content-Type":"application/json"
      }
    });
  }

}