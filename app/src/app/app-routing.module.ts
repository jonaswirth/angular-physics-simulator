import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { LessonComponent } from './lesson/lesson.component';


const routes: Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'lession/:id', component: LessonComponent},
  //Redirects
  {path: 'lession', redirectTo: 'overview'},
  {path: '', redirectTo: '/overview', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
