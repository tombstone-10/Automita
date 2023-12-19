

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

  export default GeneticAlgorithm;