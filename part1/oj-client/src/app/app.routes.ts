import { Routes, RouterModul } from "@angular/router";
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

const routes : Routes = [
  {
    path: "",
    redirectTo: "problems",
    pathMath: "full"
  },
  {
    path: "problems",
    component: ProblemListComponent
  },
  {
    path: "problems/:id",
    component: ProblemDetailComponent
  },
  {
    path: "**",
    redirectTo: "problems"
  }
]

export const routing = RouterModul.forRoot(routes)
