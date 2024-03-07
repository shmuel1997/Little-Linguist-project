import { Routes } from '@angular/router';
import { CategoryTableComponent } from './category-table/category-table.component';
import { NewFormsComponent } from './new-forms/new-forms.component';
import { GameComponent } from './game/game.component';
import { SelectCategoryComponent } from './select-category/select-category.component';

export const routes: Routes = [
    {path:"",component:CategoryTableComponent},
    {path:"newForms/:idCategory",component:NewFormsComponent},
    {path:"game/:idCategory",component:GameComponent},
    {path:"selectCategory",component:SelectCategoryComponent}

    
];
