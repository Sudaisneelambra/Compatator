import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor (private api:CommonService){}

  current_page=1
  per_page=8
  datas:any
  fullData:any
  page = 1

  boolean:any


  ngOnInit(){
    this.getFullCource()
    this.api.boolean.subscribe((val)=>{
      this.boolean = val
    })
  }

  next(){
    this.page++
    this.current_page++
    this.getFullCource()
  }

  prev(){
    this.page--
    this.current_page--
    this.getFullCource()

  }

  getFullCource(){
    this.api.boolean.next(true)
    const body={
      search:"",
      sort:"new",
      category: "",
      current_page:this.current_page,
      per_page:this.per_page
    }

      this.api.getCoursesAll(body).subscribe({
        next:(res)=>{
          this.fullData=res
          console.log(this.fullData);
          console.log(this.fullData?.prev_page_url);
          
          this.datas = res.data
          this.api.boolean.next(false)  
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        },
        error:(err)=>{
          console.log(err);
          this.api.boolean.next(false)  
          
        }
      })
  }

}
