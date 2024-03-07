import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { Language } from '../shared/model/language';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { TranslatedWord } from '../shared/model/translatedWord';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,NgFor,NgIf,MatIconModule,MatButtonModule,MatToolbarModule ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent implements OnInit{
  @Input() idCategory:string="0";
  translionWords:TranslatedWord[]=[]
  translationFlag:boolean=false;
  categoryForCheck:Category;

wordResult:boolean[]=[];
  correctlyWordsMone: number=0;
  constructor(private categoryService:CategoryService) {
  this.categoryForCheck=new Category(parseInt( this.idCategory),'',Language.English,Language.Hebrew);
  }
ngOnInit(): void {
 let category=this.categoryService.getCategory(parseInt( this.idCategory));

this.categoryForCheck=category;


this.categoryForCheck.words.forEach ((word:TranslatedWord)=>{
  word.target="";
})



}
correctTranslation(){
if(this.translationFlag)
this.translationFlag=false;
else
{
  let category=this.categoryService.getCategory(parseInt( this.idCategory));
  this.translionWords=category.words;
  this.translationFlag=true;

}







}
testWords(){
this.correctlyWordsMone=0;
  this.wordResult=[];
  let category=this.categoryService.getCategory(parseInt( this.idCategory));

for (let i = 0; i < category.words.length; i++) {
 if(this.categoryForCheck.words[i].target!=category.words[i].target)
this.wordResult[i]=false;
else
{
  this.wordResult[i]=true;
this.correctlyWordsMone++;
}

  
}





}


}
