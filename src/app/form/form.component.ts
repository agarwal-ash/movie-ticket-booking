import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostDataService } from '../post-data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  name = new FormControl('');
  TotalSeats: any;
  selectedseats: any;
  id: any;
  movieId: any;
  showTime: any;
  userName: any;
  userMail: any;
  userSeats: any;
  userNumber: any;
  movieName: any;
  posts: any;
  morUserSeats: any;
  eveUserSeats: any;
  nigUserSeats: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private service: PostDataService,
    private httpService: UserService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.queryParams['id'];
    this.movieName = this.route.snapshot.queryParams['name'];
    this.httpService.getPostDetails(this.movieId).subscribe((response: any) => {
      this.posts = response;
      console.log(this.TotalSeats, 'at start');
    });
  }

  inputSeats(event: any) {
    this.selectedseats = event.target.value;
    if (this.showTime === 'morning') {
      this.TotalSeats = this.posts.morning - this.selectedseats;
    } else if (this.showTime === 'evening') {
      this.TotalSeats = this.posts.evening - this.selectedseats;
    } else if (this.showTime === 'night') {
      this.TotalSeats = this.posts.night - this.selectedseats;
    }

    console.log(this.TotalSeats, ' after input is given ', this.showTime);
  }

  reassignTotalSeats() {
    this.TotalSeats = 100;
  }

  checkout() {
    let obj: any;
    console.log(this.TotalSeats, 'submitClick');
    if (this.showTime === 'morning') {
      obj = { morning: this.TotalSeats };
    } else if (this.showTime === 'evening') {
      obj = { evening: this.TotalSeats };
    } else {
      obj = { night: this.TotalSeats };
    }
    console.log(obj);
    this.http
      .put<any>(
        'https://633eb81a83f50e9ba3b6ac72.mockapi.io/films/' + this.movieId,
        obj
      )
      .subscribe(
        (data) => console.log('put success', data),

        (error) => console.log('put oops', error)
      );

    let user = {
      name: this.userName,
      mail: this.userMail,
      number: this.userNumber,
      seat_available: this.TotalSeats,
      seats_booked: this.selectedseats,
      show_time: this.showTime,
      movie_name: this.movieName,
      movie_id: this.movieId,
    };

    this.service.postUserData(user);

    this.router.navigate(['/success']);
  }

  assignShowTime(event: any) {
    this.showTime = event.target.value;
    if (this.showTime === 'morning') {
      this.TotalSeats = this.posts.morning;
    } else if (this.showTime === 'evening') {
      this.TotalSeats = this.posts.evening;
    } else if (this.showTime === 'night') {
      this.TotalSeats = this.posts.night;
    }
  }

  assignName(event: any) {
    this.userName = event.target.value;
  }

  assignEmail(event: any) {
    this.userMail = event.target.value;
  }

  assignNumber(event: any) {
    this.userNumber = event.target.value;
  }
}
