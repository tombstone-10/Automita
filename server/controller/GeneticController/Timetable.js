import { getClasses, getRooms, getTeachers,getCourses,getTimeSlots,getDaysOfWeek } from "../timetableController";
import Individual from "./Individual";
// Genetic Algorithm parameters

const daysOfWeek = getDaysOfWeek();
const timeSlots = getTimeSlots();
const teachers = getTeachers();
const classes = getClasses();
const courses = getCourses();
const classrooms = getRooms();


const populationSize = 200;
const mutationRate = 0.01;

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

