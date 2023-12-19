import { getClasses, getRooms, getTeachers,getCourses,getTimeSlots,getDaysOfWeek } from "../timetableController";
import Individual from "./Individual";
const { default: generateRandomTimetable } = require("./RandomTimetables");
// Genetic Algorithm parameters

const daysOfWeek = getDaysOfWeek();
const timeSlots = getTimeSlots();
const teachers = getTeachers();
const classes = getClasses();
const courses = getCourses();
const classrooms = getRooms();


const populationSize = 200;
const mutationRate = 0.01;
class Individual {
  constructor() {
    this.genes = generateRandomTimetable();
    this.fitness = this.calculateFitness();
  }

  calculateFitness() {
    let fitness = 1.0;

    // Check for teacher clashes
    const teacherClashes = new Set();
    const maxTeacherClashes = teachers.length - 1;
    for (const day of daysOfWeek) {
      for (const timeSlot of timeSlots) {
        const { teacher } = this.genes[day][timeSlot];
        if (teacherClashes.has(teacher)) {
          fitness -= 0.1 / maxTeacherClashes;
        } else {
          teacherClashes.add(teacher);
        }
      }
    }

    // Check for class clashes
    const classClashes = new Set();
    const maxClassClashes = classes.length - 1;
    for (const day of daysOfWeek) {
      for (const timeSlot of timeSlots) {
        const { class: className } = this.genes[day][timeSlot];
        if (classClashes.has(className)) {
          fitness -= 0.1 / maxClassClashes;
        } else {
          classClashes.add(className);
        }
      }
    }

    // Check for classroom clashes
    const classroomClashes = new Set();
    const maxClassroomClashes = classrooms.length - 1;
    for (const day of daysOfWeek) {
      for (const timeSlot of timeSlots) {
        const { classroom } = this.genes[day][timeSlot];
        if (classroomClashes.has(classroom)) {
          fitness -= 0.1 / maxClassroomClashes;
        } else {
          classroomClashes.add(classroom);
        }
      }
    }

    // Check for course clashes
    const courseClashes = new Set();
    const maxCourseClashes = courses.length - 1;
    for (const day of daysOfWeek) {
      for (const timeSlot of timeSlots) {
        const { course } = this.genes[day][timeSlot];
        if (courseClashes.has(course)) {
          fitness -= 0.1 / maxCourseClashes;
        } else {
          courseClashes.add(course);
        }
      }
    }

    return fitness;
  }

  crossover(partner) {
    const child = new Individual();
    // Implement crossover logic here
    // Example Crossover:
    // Combine genes from parents (simple one-point crossover)
    const midpoint = Math.floor(Math.random() * this.genes.length);
    for (let i = 0; i < this.genes.length; i++) {
      if (i < midpoint) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
    }
    
    
    return child;
  }

  mutate() {
    // Example Mutation:
    // Introduce small changes to genes (swap two elements)
    const mutationPoint1 = Math.floor(Math.random() * this.genes.length);
    let mutationPoint2 = Math.floor(Math.random() * this.genes.length);
    while (mutationPoint2 === mutationPoint1) {
      mutationPoint2 = Math.floor(Math.random() * this.genes.length);
    }

    // Swap two elements
    const temp = this.genes[mutationPoint1];
    this.genes[mutationPoint1] = this.genes[mutationPoint2];
    this.genes[mutationPoint2] = temp;
  }
}


class GeneticAlgorithm {
    constructor(populationSize) {
      this.population = [];
      for (let i = 0; i < populationSize; i++) {
        this.population.push(new Individual());
      }
    }
  
    evolve() {
      this.population.sort((a, b) => b.fitness - a.fitness);
  
      const newGeneration = [];
      for (let i = 0; i < populationSize; i++) {
        const parent1 = this.selectParent();
        const parent2 = this.selectParent();
        const child = parent1.crossover(parent2);
        child.mutate();
        newGeneration.push(child);
      }
  
      this.population = newGeneration;
    }
  
    selectParent() {
      const tournamentSize = 5;
      const tournament = [];
      for (let i = 0; i < tournamentSize; i++) {
        const randomIndex = Math.floor(Math.random() * this.population.length);
        tournament.push(this.population[randomIndex]);
      }
      tournament.sort((a, b) => b.fitness - a.fitness);
      return tournament[0];
    }
  
    getBest() {
      return this.population[0];
    }
  }


// Main genetic algorithm loop
const maxGenerations = 1000;
const geneticAlgorithm = new GeneticAlgorithm();

for (let generation = 0; generation < maxGenerations; generation++) {
  geneticAlgorithm.evolve();
  const bestIndividual = geneticAlgorithm.getBest();

  console.log(`Generation ${generation}:`, bestIndividual.genes);
  console.log(`Fitness: ${bestIndividual.fitness}`);

  // Add termination condition based on fitness or other criteria

  // Example termination condition:
  if (bestIndividual.fitness >= 1) {
    console.log("Optimal timetable found!");
    TimetableModel.add(bestIndividual);
  }
}

