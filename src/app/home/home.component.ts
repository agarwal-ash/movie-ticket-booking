import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'myApp';
  allposts: any;
  posts: any;
  movieId: any;
  constructor(private httpService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.httpService.getPosts().subscribe((response) => {
      this.posts = response;
      this.allposts = response;
      // console.log(this.posts);
    });
  }

  ShowEnglish() {
    this.posts = this.allposts;
    this.posts = this.posts.filter((data: any) => {
      return data.language === 'English';
    });
  }

  ShowHindi() {
    this.posts = this.allposts;
    this.posts = this.posts.filter((data: any) => {
      return data.language === 'Hindi';
    });
  }

  movieDetails(i: any) {
    this.router.navigate(['/form'], {
      queryParams: { id: i.id, name: i.name },
    });
    console.log(i);
  }

  RedirectDetails() {
    this.router.navigate(['/admin']);
  }

  RedirectHome() {
    this.router.navigate(['/home']);
  }
}
