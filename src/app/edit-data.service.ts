import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditDataService {
  moviedata: any;
  changeinbookedseats: any;

  constructor(private http:HttpClient) { }
  editUserData(changeinbookedseats:any,id:any,showtime:any)
  {
    let moviedata;
    this.http.get("https://633eb81a83f50e9ba3b6ac72.mockapi.io/films/"+id).subscribe(
      (response:any)=>{
        moviedata=response;
        console.log(moviedata,'moviedata');
        console.log(id);
        console.log(changeinbookedseats,'change');
        if(showtime==='morning')
        {
          moviedata.morning=moviedata.morning+changeinbookedseats;
        }
        else if(showtime==='evening')
        {
          moviedata.evening=moviedata.evening+changeinbookedseats;
        }
        else if(showtime==='night')
        {
          moviedata.night=moviedata.night+changeinbookedseats;
        }
        
        let obj : any;
        if(showtime==='morning')
        {
          obj={morning:moviedata.morning};
        }
        else if(showtime==='evening')
        {
          obj={evening:moviedata.evening};
        }
        else if(showtime)
        {
          obj={night:moviedata.night};
        }
        // let obj={morning:moviedata.morning};

        this.http.put("https://633eb81a83f50e9ba3b6ac72.mockapi.io/films/"+id,obj).subscribe((response)=>{

        });

      }
    );
  }

}
