import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraComponent } from './components/extra/extra.component';
import { StudentTableComponent } from './components/student-table/student-table.component';

const routes: Routes = [
  { path: '', component: StudentTableComponent, pathMatch: 'full' },
  { path: 'extra', component: ExtraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
