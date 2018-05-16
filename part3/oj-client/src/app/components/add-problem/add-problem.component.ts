import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: "",
  desc: "",
  difficulty: ""
});

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {

  public difficulties = ["Easy", "Medium","Hard", "Super"];

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM); // make a default problem

  constructor(@Inject("data") private data) { }

  ngOnInit() {
  }

  addProblem(): void {
    this.data.addProblem(this.newProblem)
             .catch(error => console.log(error.body));
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}
