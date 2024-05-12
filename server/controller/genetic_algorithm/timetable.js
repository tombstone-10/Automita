const mutationRate = 0.01;
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["8:00AM-9:00AM", "9:00AM-10:00AM", "10:00AM-11:00AM", "11:00AM-12:00PM", "12:00PM-1:00PM", "1:00PM-2:00PM", "2:00PM-3:00PM", "3:00PM-4:00PM"];
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length); // Generate a random index
    return array[randomIndex];
}
function generateRandomTimetable(Teacherdata, rooms, daysOfWeek, timeSlots) {
    if (!Array.isArray(Teacherdata) || !Array.isArray(rooms)) {
        console.error("Teacherdata and rooms must be arrays");
        return [];
    }

    const classAssignmentsSet = new Set();
    const roomsSet = new Set();
    const namesSet = new Set();

    const result = [];

    for (const item of Teacherdata) {
        let day, timeSlot, room, classKey, roomKey, nameKey;

        let isUnique = false;

        while (!isUnique) {
            day = getRandomElement(daysOfWeek);
            timeSlot = getRandomElement(timeSlots);
            room = getRandomElement(rooms);

            classKey = `${item.class_assigned}-${day}-${timeSlot}`;
            roomKey = `${room}-${day}-${timeSlot}`;
            nameKey = `${item.name}-${day}-${timeSlot}`;

            if (!classAssignmentsSet.has(classKey) && !roomsSet.has(roomKey) && !namesSet.has(nameKey)) {
                isUnique = true; // Found a unique combination
                classAssignmentsSet.add(classKey);
                roomsSet.add(roomKey);
                namesSet.add(nameKey);
            }
        }


        result.push({
            ...item,
            day,
            timeSlot,
            room,
        });
    }

    return result;
}




class Individual {
    constructor(Teacherdata, Roomsdata, daysOfWeek, timeSlots) {
        this.genes = generateRandomTimetable(Teacherdata, Roomsdata, daysOfWeek, timeSlots);
        this.fitness = this.calculateFitness(this.genes);
    }


    // calculateFitness(timetable) {
    //     let fitnessScore = 100; // Start with a base fitness score

    //     const classAssignmentsSet = new Set();
    //     const roomsSet = new Set();
    //     const namesSet = new Set();

    //     // Iterate over the timetable to check for violations
    //     for (const item of timetable) {
    //         const { class_assigned, day, timeSlot, room, name } = item;

    //         const classKey = `${class_assigned}-${day}-${timeSlot}`;
    //         const roomKey = `${room}-${day}-${timeSlot}`;
    //         const nameKey = `${name}-${day}-${timeSlot}`;

    //         // Penalize if duplicate keys are found
    //         if (classAssignmentsSet.has(classKey)) {
    //             fitnessScore -= 10;
    //         } else {
    //             classAssignmentsSet.add(classKey);
    //         }

    //         if (roomsSet.has(roomKey)) {
    //             fitnessScore -= 10;
    //         } else {
    //             roomsSet.add(roomKey);
    //         }

    //         if (namesSet.has(nameKey)) {
    //             fitnessScore -= 10;
    //         } else {
    //             namesSet.add(nameKey);
    //         }
    //     }

    //     return fitnessScore;
    // }
    calculateFitness(timetable) {
        let fitnessScore = 100; // Start with a base fitness score

        const classAssignmentsSet = new Set();
        const roomsSet = new Set();
        const namesSet = new Set();

        // Iterate over the timetable to check for violations
        for (const item of timetable) {
            const { class_assigned, day, timeSlot, room, name } = item;

            const classKey = `${class_assigned}-${day}-${timeSlot}`;
            const roomKey = `${room}-${day}-${timeSlot}`;
            const nameKey = `${name}-${day}-${timeSlot}`;

            // Penalize only if duplicate keys are found
            if (classAssignmentsSet.has(classKey)) {
                fitnessScore -= 10; // Lower penalty to avoid excessive negative scores
            } else {
                classAssignmentsSet.add(classKey);
            }

            if (roomsSet.has(roomKey)) {
                fitnessScore -= 10; // Consider lowering penalty to avoid over-penalization
            } else {
                roomsSet.add(roomKey);
            }

            if (namesSet.has(nameKey)) {
                fitnessScore -= 10; // Lower penalties for name conflicts
            } else {
                namesSet.add(nameKey);
            }
        }

        return fitnessScore;
    }


    crossover(partner, Teacherdata, Roomsdata, daysOfWeek, timeSlots) {
        const child = new Individual(Teacherdata, Roomsdata, daysOfWeek, timeSlots);
        const midpoint = Math.floor(Math.random() * this.genes.length);

        // One-point crossover
        child.genes = this.genes.map((gene, index) =>
            index < midpoint ? gene : partner.genes[index]
        );

        child.fitness = child.calculateFitness(child.genes); // Recalculate fitness for the child
        return child;
    }

    mutate() {
        if (Math.random() < mutationRate) {
            const mutationPoint = Math.floor(Math.random() * this.genes.length);
            const randomDay = getRandomElement(daysOfWeek);
            const randomTimeSlot = getRandomElement(timeSlots);
            this.genes[mutationPoint].day = randomDay;
            this.genes[mutationPoint].timeSlot = randomTimeSlot;

            // Recalculate fitness after mutation
            this.fitness = this.calculateFitness(this.genes);
        }
    }
}

class GeneticAlgorithm {
    constructor(populationSize, Teacherdata, Roomsdata, daysOfWeek, timeSlots) {
        this.populationSize = populationSize;

        if (!Array.isArray(Teacherdata) || !Array.isArray(Roomsdata)) {
            throw new Error("Teacherdata or Roomsdata is not an array");
        }

        this.Teacherdata = Teacherdata;
        this.Roomsdata = Roomsdata;
        this.daysOfWeek = daysOfWeek;
        this.timeSlots = timeSlots;

        this.population = [];
        this.initializePopulation(); // Initialize the population synchronously
    }

    initializePopulation() {
        for (let i = 0; i < this.populationSize; i++) {
            this.population.push(new Individual(this.Teacherdata, this.Roomsdata, this.daysOfWeek, this.timeSlots));
        }
    }



    evolve() {
        this.population.sort((a, b) => b.fitness - a.fitness);

        const newGeneration = [];
        for (let i = 0; i < this.populationSize; i++) {
            const parent1 = this.selectParent();
            const parent2 = this.selectParent();

            if (!parent1 || !parent2) {
                console.error("Undefined parent in evolve, skipping iteration.");
                continue; // Avoid error due to undefined parent
            }

            const child = parent1.crossover(parent2, this.Teacherdata, this.Roomsdata, this.daysOfWeek, this.timeSlots);
            child.mutate(); // Mutate to maintain diversity
            newGeneration.push(child);
        }

        this.population = newGeneration; // Update the population
    }

    selectParent() {
        const tournamentSize = 5;
        const tournament = [];

        // Ensure there's enough population for the tournament
        if (this.population.length < tournamentSize) {
            console.error("Population is smaller than tournament size.");
            return undefined; // Early exit with undefined
        }

        for (let i = 0; i < tournamentSize; i++) {
            const randomIndex = Math.floor(Math.random() * this.population.length);
            tournament.push(this.population[randomIndex]);
        }

        tournament.sort((a, b) => b.fitness - a.fitness);
        return tournament[0]; // Return the best from the tournament
    }

    getBest() {
        if (this.population.length === 0) {
            console.error("Population is empty.");
            return null; // Return null if there's no population
        }
    
        let maximum_fitness = this.population[0].fitness; // Initialize with the first element's fitness
        let bestIndex = 0;
    
        // Find the index of the individual with the maximum fitness
        for (let i = 1; i < this.population.length; i++) { 
            if (this.population[i].fitness > maximum_fitness) {
                maximum_fitness = this.population[i].fitness;
                bestIndex = i;
            }
        }
    
        return this.population[bestIndex]; // Return the best individual
    }
}




module.exports = GeneticAlgorithm;