import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/model/category';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [MatTableModule,MatIconModule ,RouterModule,MatSortModule,MatButtonModule,MatToolbarModule],
  templateUrl:'./category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent implements OnInit{
   displaycolumn=['name','words','date','action']
  categories:Category[]=[];
  sortedData: Category[]=[];
  constructor(private categoryService:CategoryService,private dialog:MatDialog){
   /*  let c1=new Category("animal",0)
    c1.addPair('cat', 'חתול')
    this.categories.push(c1)
    let c2=new Category("fruit",1)
    c2.addPair('apple', 'תפוח')
    this.categories.push(c2)
    let c3=new Category("ourbody",2)
    c3.addPair('leg', 'רגל')
    this.categories.push(c3)
    let c4=new Category("vegetable",3)
    c4.addPair('potato', 'תפוח אדמה')
    this.categories.push(c4) */
  
  
  
  }
ngOnInit(): void {
  this.categories=this.categoryService.getAllCategory();

  this.sortedData=this.categoryService.getAllCategory();
}
deleteCategory(category:Category)
{

  const dialogRef = this.dialog.open(DeleteDialogComponent,{data: category.name});

  dialogRef.afterClosed().subscribe((deletionConfirmed:boolean) => {
   if(deletionConfirmed){
    this.categoryService.deleteCategory(category);
    this.categories=this.categoryService.getAllCategory();
   }
   });
   


}
sortData(sort:Sort){
  const data = this.categories.slice(); // Create a copy of the original data
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }


  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'name':
        return compare(a.name, b.name, isAsc);
      case 'lastUpdateDate':
        return compare(a.lastUpdateDate, b.lastUpdateDate, isAsc);
      case 'wordsNumber':
        return compare(a.words.length, b.words.length, isAsc);
      
      default:
        return 0;
    }
  });
}
}

function compare(a: number | string|Date, b: number | string|Date, isAsc: boolean) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



