import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories =  [ {
    "cid": 0,
    "title": "",
    "description": ""
}];
  constructor(private _category : CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
     this.categories = data;
      console.log(this.categories);
    },
    (error:any)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading data", 'error');
    }
      
    );
  }
  call(){
    // this._category.getCategories().subscribe((data:any)=>{

    // },
    // (error:any)=>{
    //   console.log(error);
    // }
    // );
  }

}
