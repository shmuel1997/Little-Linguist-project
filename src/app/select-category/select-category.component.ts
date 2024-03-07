import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-select-category',
  standalone: true,

  imports: [NgFor,MatFormFieldModule,MatSelectModule,MatInputModule, FormsModule,RouterModule,MatToolbarModule,MatButtonModule],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.css'
})
export class SelectCategoryComponent  implements OnInit {
  constructor(private categoryService:CategoryService) {
   
   }
categories:Category[]=[];
selectCategory?:number;

ngOnInit(): void {
  this.categories=this.categoryService.getAllCategory();
}
}
