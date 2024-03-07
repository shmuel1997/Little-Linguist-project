import { Injectable } from '@angular/core';
import { Category } from '../shared/model/category';
import { Language } from '../shared/model/language';
import { TranslatedWord } from '../shared/model/translatedWord';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly CATEGORIES_KEY = 'categories';

  private readonly NEXT_ID_KEY='nextId';

  constructor() {
   }

private getNextId() : number {
let nextIdString = localStorage.getItem(this.NEXT_ID_KEY); 

return nextIdString ? parseInt(nextIdString) : 0;
}
 private setNextId(id : number) : void {
 localStorage.setItem(this.NEXT_ID_KEY, JSON.stringify(id));
}

private setCategories(categories : Map<number, Category>) : void {
  localStorage.setItem(this.CATEGORIES_KEY, 
  JSON.stringify(Array.from(categories.values())));
 }




/*  (1,{
  id:1,
  name:game,
  
}) */
 private getCategories() : Map<number, Category>{
  let categoryString = localStorage.getItem(this.CATEGORIES_KEY);
  let idOfCategory = new Map<number, Category>();
  if (categoryString) {
  JSON.parse(categoryString).forEach((category: Category) => {
  
  Object.setPrototypeOf(category, Category.prototype);
  idOfCategory.set(category.id, category);
  });
  }
  return idOfCategory;
 }
 

getAllCategory(){
return Array.from(this.getCategories().values());
}
getCategory(idCategory:number){

let category=this.getCategories().get(idCategory);


if(!category)
{
      throw new Error("Failed to get category by id: " + idCategory);

}
  return category;

}
addCategory(newCategoryData:Category)
{
  let nextId=this.getNextId();

newCategoryData.id=nextId;
newCategoryData.lastUpdateDate=new Date();

let categoriesMap = this.getCategories();
categoriesMap.set(newCategoryData.id, newCategoryData);
this.setCategories(categoriesMap);




//this.categories.set(this.nextId, newCategoryData);
//this.setNextId()


this.setNextId(++nextId);
}
deleteCategory(deleteCategory:Category){
  let category=this.getCategories().get(deleteCategory.id);

  if(!category)
  {
        throw new Error("Failed to delete category by id: " + deleteCategory.id);

  }
  




  let categoriesMap = this.getCategories();
  categoriesMap.delete(deleteCategory.id);
  this.setCategories(categoriesMap);



//if(this.categories.get(deleteCategory.id))


//this.categories.delete(deleteCategory.id);
//localStorage.

}
updateCategory(updateCategory:Category){
updateCategory.lastUpdateDate=new Date();


let category=this.getCategories().get(updateCategory.id);

if(!category)
{
      throw new Error("Failed to update category by id: " + updateCategory.id);
}
let categoriesMap = this.getCategories();
categoriesMap.set(updateCategory.id, updateCategory);
this.setCategories(categoriesMap);
}


updateOrAddCategory(updateOrAddCategory:Category){

  updateOrAddCategory.lastUpdateDate=new Date();
let categoriesMap = this.getCategories();
categoriesMap.set(updateOrAddCategory.id, updateOrAddCategory);
this.setCategories(categoriesMap);
let nextId=this.getNextId();
if(updateOrAddCategory.id>nextId)  this.setNextId(++nextId);
}



}
