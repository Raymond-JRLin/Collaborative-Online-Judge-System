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

var getProblems = function () {
  return new Promise(function(resolve, reject) {
    resolve(problems);
  });
}

var getProblem = function (id) {
  return new Promise(function(resolve, reject) {
    resolve(problems.find(problem => problem.id === id));
  });
}

var addProblem = function (newProblem) {
  return new Promise((resolve, reject) => {
    if (problems.find(problem => problem.name === newProblem.name)) {
      reject("Problem already exist!");
    } else {
      newProblem.id = problems.length + 1;
      problems.push(newProblem);
      resolve(newProblem);
    }
  });
}

module.exports = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
};
