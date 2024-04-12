interface Attendance {
     problem: string; 
     description: string;
     person: string;
     area: string;
}

class Attendance implements Attendance{
 
  constructor(
    problem: string,
    description: string,
    person: string,
    area: string
  ) {
    this.problem = problem;
    this.description = description;
    this.person = person;
    this.area = area;
  }


  // generate setter and getter

  set setProblem(problem: string) {
    this.problem = problem;
  }

  set setDescription(description: string) {
    this.description = description;
  }

  set setPerson(person: string) {
    this.person = person;
  }

  set setArea(area: string) {
    this.area = area;
  }

  get getProblem() : string {
    return this.problem;
  }

  get getDescription() : string {
    return this.description;
  }

  get getPerson() : string {
    return this.person;
  }

  get getArea() : string {
    return this.area;
  }

}

export default Attendance