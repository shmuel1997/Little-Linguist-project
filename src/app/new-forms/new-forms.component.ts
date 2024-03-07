import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/model/category';
import { Language } from '../shared/model/language';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { TranslatedWord } from '../shared/model/translatedWord';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-new-forms',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,NgIf,NgFor,MatButtonModule,MatToolbarModule],
  templateUrl: './new-forms.component.html',
  styleUrl: './new-forms.component.css'
})
export class NewFormsComponent implements OnInit{
@Input() idCategory:string="0";
currentCategory:Category;
textErrorWords=false;
constructor(private categoryService:CategoryService,private router:Router) {
  this.currentCategory=new Category(0,'',Language.English,Language.Hebrew);

}
ngOnInit(): void {
let idCategory=parseInt(this.idCategory);
//let category=this.categoryService.getCategory(idCategory);
if(idCategory!=this.categoryService.getAllCategory().length)
this.currentCategory=this.categoryService.getCategory(idCategory);
else
this.currentCategory.id=idCategory;
}

getErrorText(input:NgModel)
{



  if(input.hasError('required'))
  return "required field";

  return "invalid characters";

}

addNewWord(){
this.currentCategory.words.push(new TranslatedWord('',''));
}
deleteWord(index:number){
  this.currentCategory.words.splice(index,1);
}
saveCategory(){
  if(this.currentCategory.words.length==0)
  
      this.textErrorWords=true;

  
else
{
  this.textErrorWords=false;


if(this.currentCategory.id==this.categoryService.getAllCategory().length)
{
 this.categoryService.addCategory(this.currentCategory);
 
}

else
{
    this.categoryService.updateCategory(this.currentCategory);

}


  this.router.navigate(['/']);
}

}
}
