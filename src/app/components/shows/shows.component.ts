import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/httpservice.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Route, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'username', 'movie', 'show', 'tickets','actions'];
  dataSource: any;
  editableIds: string[] = [];
  
  constructor(private http:HttpserviceService, private router:Router) { }

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.http.getBookings().subscribe(data=>{
      data = data.map((item: any) => {
        item.show = item.show.toUpperCase() + " SHOW";
        return item;
      })
      console.log(data);
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  // adding the curr id of booking to edit list, if it is not already present
  addId(id: string) {
    if(this.editableIds.findIndex(currId => currId === id) !== -1) {
      return;
    }
    this.editableIds.push(id);
  }

  // searching for the id in the edit array
  findId(id: string) {
    return this.editableIds.join('-').search(id) !== -1;
  }

  // if we click on cancel we remove the curr id from edit array
  removeId(id: string) {
    this.editableIds = this.editableIds.filter(currId => currId !== id);
  }

  // if we make changes and click on done then the changes will be reflected in the api...
  updateRow(element: any) {
    this.http.editBooking(element.id,element).subscribe((data: any) => console.log(data));
    this.editableIds = this.editableIds.filter(currId => currId !== element.id);
  }
  
}