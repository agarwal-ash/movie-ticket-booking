import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EditDataService } from '../edit-data.service';
import { Route, Router } from '@angular/router';
import { GetUserDataService } from '../get-user-data.service';

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'movie_name',
    type: 'text',
    label: 'Movie Name',
  },
  // {
  //   key: 'movie_id',
  //   type: 'text',
  //   label: 'Movie Id',
  // },
  {
    key: 'show_time',
    type: 'text',
    label: 'Show Time',
  },
  {
    key: 'seats_booked',
    type: 'number',
    label: 'Number of Seats Booked',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  oldbookedseats: any;
  newbookedseats: any;
  changeinbookedseats: any;

  constructor(
    private GetdataService: GetUserDataService,
    private http: HttpClient,
    private editbookedseats: EditDataService,
    private router: Router
  ) {}

  dataSource: any = [];

  ngOnInit(): void {
    this.GetdataService.getusersData().subscribe((response: any) => {
      console.log(response, 'getting data from api');
      this.dataSource = response;
    });
  }

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;

  EditingStarted(element: any) {
    this.oldbookedseats = element.seats_booked;
    console.log(this.oldbookedseats, 'old');
  }

  EditingDone(element: any) {
    let editeduser = {
      name: element.name,
      movie_name: element.movie_name,
      show_time: element.show_time,
      seats_booked: element.seats_booked,
    };
    console.log('edited user', element);
    console.log('after editing', editeduser);

    this.http
      .put<any>(
        'https://633eb81a83f50e9ba3b6ac72.mockapi.io/users/' + element.id,
        editeduser
      )
      .subscribe(
        (data) => console.log('put success', data),
        (error) => console.log('put oops', error)
      );

    this.newbookedseats = element.seats_booked;

    this.changeinbookedseats = this.oldbookedseats - this.newbookedseats;

    console.log(
      this.oldbookedseats,
      this.newbookedseats,
      this.changeinbookedseats,
      'change in booked seats'
    );

    this.editbookedseats.editUserData(
      this.changeinbookedseats,
      element.movie_id,
      element.show_time
    );
  }

  RedirectHome() {
    this.router.navigate(['/home']);
  }
}
