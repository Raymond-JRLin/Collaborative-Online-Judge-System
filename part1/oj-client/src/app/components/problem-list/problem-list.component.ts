import { Component, OnInit } from '@angular/core';
import { Problem } from "../../models/problem.model";

const PROBLEMS: Problem[] = [
  {
    id: 1,
    name: "Two Sum",
    desc: "Given an array ...",
    difficulty: "easy"
  },
  {
    id: 2,
    name: "3Sum",
    desc: "Given an array S of n integers ...",
    difficulty: "medium"
  },
  {
    id: 3,
    name: "4Sum",
    desc: "Given ..",
    difficulty: "medium"
  }]

@Component({
  selector: 'app-problem-list',
  template: `
    <div class="container">
      <div class="list-group">
        <a class="list-group-item" *ngFor="let problem of problems">
          <span>{{problem.difficulty}}</span>
          <strong>{{problem.id}}. {{problem.name}}</strong>
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class ProblemListComponent implements OnInit {

  problems: Problem[];

  constructor() { }

  ngOnInit() {
    this.problems = PROBLEMS;
  }

}
