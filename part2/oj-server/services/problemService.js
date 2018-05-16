var problems = [
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
  },
  {
    id: 4,
    name: "Triangle count",
    desc: 'Given an arraay of integers, how many three numbers',
    difficulty: "hard"
  },
  {
    id: 5,
    name: "Sliding Window Maximum",
    desc: "Given an array of n interger with duplicate number",
    difficulty: "super"
  }];

var problemModel = require('../models/problemModel');

var getProblems = function () {
  return new Promise(function(resolve, reject) {
    ProblemModel.find({}, function (err, problems) {
      if (err) {
        reject(err);
      } else {
        resolve(problems);
      }
    });
  });
}

var getProblem = function (id) {
  return new Promise(function(resolve, reject) {
    ProblemModel.findOne({ id: id }, function (err, problem) {
      if (err) {
        reject(err);
      } else {
        resolve(problem);
      }
    });
  });
}

var addProblem = function (newProblem) {
  return new Promise((resolve, reject) => {
    ProblemModel.findOne({ name: newProblem:name }, function (err, problem) {
      if (problem) {
        reject("Problem name already exist!");
      } else {
        ProblemModel.count({}, function (err, num) {
          newProblem.id = num + 1;
          var mongoProblem = new ProblemModel(newProblem);
          mongoProblem.save();
          resolve(newProblem);
        });
      }
    });
  });
}

module.exports = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
};
