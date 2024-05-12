const asyncHandler = require('express-async-handler');  //it will handle all the errors asychronously
const Class = require('../models/classModel');
const Course = require('../models/courseModel');
const Rooms = require('../models/roomsModel');
const Teacher = require('../models/teacherModel');
const { validationResult } = require('express-validator');
const GeneticAlgorithm = require('./genetic_algorithm/timetable');
const Timetable = require('../models/timetableModel');


// @Description    Add new class
// @route          /api/timetables/class/add
// @method          post
// @access Public

const addClass = asyncHandler(async (req, res) => {
    const errors = validationResult(req);    //validate and sanitize user inputs to prevent malicious input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.user;
    const { program_name, session, semester, section } = req.body;

    // Checking if there are inputs in all fields
    if (!program_name || !session || !semester || !section) {
        res.status(400);
        throw new Error('Please add all Fields');
    }

    //checking if the user alread exists or not
    const classExists = await Class.findOne({
        program_name: { $regex: new RegExp(`^${program_name}$`, 'i') },
        session: { $regex: new RegExp(`^${session}$`, 'i') },
        semester: parseInt(semester),  // Convert semester to a number
        section: { $regex: new RegExp(`^${section}$`, 'i') }
    });


    if (classExists) {
        return res.status(409).json({ error: 'Class already exists' });
    }

    try {
        //creating a new User
        const newclass = await Class.create({
            email,
            program_name,
            session,
            semester,
            section,
        });

        //checking whether the user is created successfully. if yes, then appending the data to database
        if (newclass) {
            return res.status(201).json({
                email: newclass.email,
                program_name: newclass.program_name,
                session: newclass.session,
                semester: newclass.semester,
                section: newclass.section,
            });
        } else {
            return res.status(400).json({ error: 'Invalid Class Data' });
        }
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
const addCourse = asyncHandler(async (req, res) => {
    const errors = validationResult(req);    //validate and sanitize user inputs to prevent malicious input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.user;
    const { code, name, credit_hours, class_assigned } = req.body;

    // Checking if there are inputs in all fields
    if (!code || !name || !class_assigned || credit_hours == null) {
        return res.status(400).json({ error: 'Please add all fields' });
    }

    //checking if the user alread exists or not
    const courseExists = await Course.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        code: { $regex: new RegExp(`^${code}$`, 'i') },
        credit_hours: parseInt(credit_hours),
    });


    if (courseExists) {
        return res.status(409).json({ error: 'Course already exists' });
    }

    try {
        //creating a new Course
        const newCourse = await Course.create({
            email,
            code,
            name,
            credit_hours,
            class_assigned,
        });

        //checking whether the Course is created successfully. if yes, then appending the data to database
        if (newCourse) {
            return res.status(201).json({
                email: newCourse.email,
                code: newCourse.code,
                name: newCourse.name,
                credit_hours: newCourse.credit_hours,
                class_assigned: newCourse.class_assigned,
            });
        } else {
            return res.status(400).json({ error: 'Invalid Course Data' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
const addTeacher = asyncHandler(async (req, res) => {
    const errors = validationResult(req);    //validate and sanitize user inputs to prevent malicious input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.user;
    const { name, course_assigned, class_assigned } = req.body;
    // Checking if there are inputs in all fields
    if (!name || !course_assigned || !class_assigned) {
        res.status(400);
        throw new Error('Please add all Fields');
    }

    try {
        //creating a new Teacher    
        const newTeacher = await Teacher.create({
            email,
            name,
            course_assigned,
            class_assigned,
        });

        //checking whether the Teacher is created successfully. if yes, then appending the data to database
        if (newTeacher) {
            return res.status(201).json(newTeacher);
        } else {
            return res.status(400).json({ error: 'Invalid Teacher Data' });
        }
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getCourses = asyncHandler(async (req, res) => {
    const { email } = req.user;

    let coursess = await Course.find({ email: email }).select('-email');

    // Assuming `class_assigned` is a reference to another model
    coursess = await Course.populate(coursess, { path: 'class_assigned', select: 'program_name session semester section -_id' });

    res.status(200).json(coursess);
});
const getClassesFromCourse = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (id) {
        try {
            let SingleCourse = await Course.findOne({ _id: id });
            if (SingleCourse) {
                SingleCourse = await Course.populate(SingleCourse, { path: 'class_assigned', select: '_id program_name session semester section ' });
            }
            if (SingleCourse.class_assigned) {
                res.status(200).json(SingleCourse.class_assigned);
            }
            else {
                res.status(404).json('Class not found');
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json("Server error");
        }
    }
    else
        res.status(400).json("Please Add all Fields");
});


const getClasses = asyncHandler(async (req, res) => {
    const { email } = req.user;
    const classess = await Class.find({ email: email }, { email: false });  //email will be excluded from the results
    res.status(200).json(classess);

});
const getTeachers = asyncHandler(async (req, res) => {
    const { email } = req.user;

    let teacherss = await Teacher.find({ email: email }, { email: false });  // Email will be excluded from the results
    teacherss = await Teacher.populate(teacherss, { path: 'class_assigned', select: 'program_name session semester section -_id' });
    teacherss = await Teacher.populate(teacherss, { path: 'course_assigned', select: 'code name -_id' });

    res.status(200).json(teacherss);
});
const addrooms = asyncHandler(async (req, res) => {
    const errors = validationResult(req);    //validate and sanitize user inputs to prevent malicious input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.user;
    const { rooms } = req.body;
    // Checking if there are inputs in all fields
    if (!rooms) {
        res.status(400);
        throw new Error('Please add all Fields');
    }

    try {
        //creating a new Teacher    
        const newRooms = await Rooms.create({
            email: email,
            rooms: rooms
        });

        //checking whether the Teacher is created successfully. if yes, then appending the data to database
        if (newRooms) {
            return res.status(201).json(newRooms);
        } else {
            return res.status(400).json({ error: 'Invalid Room Data' });
        }
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

const getRooms = asyncHandler(async (req, res) => {
    const { email } = req.user;
    if (email) {
        try {
            let room = await Rooms.find({ email: email }, { email: false });  // Email will be excluded from the results
            if (room) {
                res.status(200).json(room);
            }
            else {
                throw new Error(`Could not find`);
            }
        }
        catch (err) {
            throw new Error("Server error ");
        }
    }


});

const deleteClass = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            console.log('No id provided');
            throw new Error('Invalid ID');
        }
        else {
        }
        const result = await Class.findByIdAndRemove(id);

        if (result) {
            return res.status(204).json({ message: 'Item deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        console.error('Error deleting item:', err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
const deleteCourse = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            console.log('No id provided');
            throw new Error('Invalid ID');
        }
        const result = await Course.findByIdAndRemove(id);

        if (result) {
            return res.status(204).json({ message: 'Item deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        console.error('Error deleting item:', err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
const deleteTeacher = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            console.log('No id provided');
            throw new Error('Invalid ID');
        }
        const result = await Teacher.findByIdAndRemove(id);

        if (result) {
            return res.status(204).json({ message: 'Item deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        console.error('Error deleting item:', err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
const deleteRoom = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            console.log('No id provided');
        }
        const result = await Rooms.findByIdAndRemove(id);

        if (result) {
            return res.status(204).json({ message: 'Item deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        console.error('Error deleting item:', err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Function to create a unique key for an object
function createKey(tutor) {
    return `${tutor.name}-${tutor.course_assigned.code}-${tutor.class_assigned._id}`;
}


const getTeachersAll = asyncHandler(async (email) => {
    try {
        const teachers = await Teacher.find({ email })
            .select("name course_assigned class_assigned ")
            .populate({
                path: "course_assigned",
                select: "name credit_hours -_id",
            })
            .populate({
                path: "class_assigned",
                select: "program_name session semester section -_id ",
            });


        const result = [];

        await teachers.forEach((teacher) => {
            const { _id, name, course_assigned, class_assigned } = teacher;

            class_assigned.forEach((cls) => {
                for (let i = 0; i < course_assigned.credit_hours; i++) {
                    result.push({
                        "_id": _id,
                        "name": name,
                        "course_assigned": course_assigned.name,
                        "class_assigned": `${cls.program_name}-${cls.session}-${cls.semester}-${cls.section}`,
                    });
                }
            });
        });



        return result;
    } catch (err) {
        console.error('Error fetching all teachers:', err.message);
        return null;
    }
});

const getRoomsAll = asyncHandler(async (email) => {
    try {
        const roomData = await Rooms.find({ email }).select("rooms -_id");
        const rooms = await roomData.map((item) => item.rooms);
        return rooms;
    } catch (err) {
        console.error("Error fetching all rooms:", err.message);
        return null;
    }
});

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["8:00AM-9:00AM", "9:00AM-10:00AM", "10:00AM-11:00AM", "11:00AM-12:00PM", "12:00PM-1:00PM", "1:00PM-2:00PM", "2:00PM-3:00PM", "3:00PM-4:00PM"];
// const generateTimetable = asyncHandler(async (req, res) => {
//     const { email } = req.params;
//     if (!email || email.length === 0) {
//         return res.status(400).json({ message: "Email is required" });
//     }

//     try {
//         const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//         const timeSlots = ["8:00AM-9:00AM", "9:00AM-10:00AM", "10:00AM-11:00AM", "11:00AM-12:00PM", "12:00PM-1:00PM", "1:00PM-2:00PM", "2:00PM-3:00PM", "3:00PM-4:00PM"];
//         const populationSize = 200;
//         const mutationRate = 0.01;

//         const Teacherdata = getTeachersAll(email);
//         if(!Teacherdata ||Teacherdata.length === 0){
//             return res.status(404).json({ message: "No teachers found" });
//         }
//         const Roomsdata = getRoomsAll(email); // Fetch room data
//         if(!Roomsdata ||Roomsdata.length === 0){
//             return res.status(404).json({ message: "No Rooms found" });
//         }
//         const geneticAlgorithm = new GeneticAlgorithm(
//             populationSize,
//             Teacherdata,
//             Roomsdata,
//             daysOfWeek,
//             timeSlots
//         );

//         const maxGenerations = 100;
//         let optimalTimetable = null;
//         let generationForOptimalTimetable = null;


//         for (let generation = 0; generation < maxGenerations; generation++) {
//             geneticAlgorithm.evolve(); // Evolve the population
//             const bestIndividual = geneticAlgorithm.getBest();

//             if (bestIndividual.fitness >= 100) { // If an optimal solution is found
//                 optimalTimetable = bestIndividual;
//                 generationForOptimalTimetable = generation;
//                 break; // Exit the loop
//             }
//         }

//         if (optimalTimetable) {
//             return res.status(200).json({
//                 message: "Optimal timetable generated successfully!",
//                 fitness: optimalTimetable.fitness,
//                 generation: generationForOptimalTimetable,
//                 timetable: optimalTimetable.genes, // Return the optimal timetable
//             });
//         } else {
//             return res.status(204).json({ message: "No optimal timetable found." }); // No content found
//         }
//     } catch (error) {
//         console.error("Error during initialization:", error);
//         return res.status(500).json({ message: "Internal Server Error" }); // Return 500 for server errors
//     }
// });
const generateTimetable = asyncHandler(async (req, res) => {
    const { email } = req.params;
    if (!email || email.length === 0) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {

        const populationSize = 200;


        const [Teacherdata, Roomsdata] = await Promise.all([
            getTeachersAll(email), // Ensure these functions are asynchronous and return valid data
            getRoomsAll(email),
        ]);
        if (!Teacherdata || Teacherdata.length === 0) {
            return res.status(404).json({ message: "No teachers found" });
        }
        if (!Roomsdata || Roomsdata.length === 0) {
            return res.status(404).json({ message: "No Rooms found" });
        }
        if (Roomsdata.length * 8 * 5 <= Teacherdata.length) {
            return res.status(404).json({ message: "ClassRooms are not enough to handle all the classes" });
        }
        const geneticAlgorithm = new GeneticAlgorithm(
            populationSize,
            Teacherdata,
            Roomsdata,
            daysOfWeek,
            timeSlots
        );




        const maxGenerations = 10000;
        let optimalTimetable = null;
        let generationForOptimalTimetable = null;

        for (let generation = 0; generation < maxGenerations; generation++) {
            geneticAlgorithm.evolve(); // Evolve the population
            const bestIndividual = geneticAlgorithm.getBest();

            if (bestIndividual.fitness >= 100) { // If an optimal solution is found
                optimalTimetable = bestIndividual;
                generationForOptimalTimetable = generation;
                break; // Exit the loop
            }
            console.log("Generation:", generation + " Fitness: ", bestIndividual.fitness);
        }

        if (optimalTimetable) {
            try {
                const timetableExists = await Timetable.findOne({
                    email: email,
                });
                if (timetableExists) {
                    await timetableExists.deleteOne();
                }
                const timetable = new Timetable({
                    email: email,
                    timetable: optimalTimetable.genes,
                });
                await timetable.save();
            } catch (err) {
                console.log("Error in saving timetable", err);
                res.status(500).json({ message: "Internal Server Error" });
            }


            console.log("Optimal timetable generated successfully!");
            console.log("Fitness:", optimalTimetable.fitness);
            console.log("Generation:", generationForOptimalTimetable);


            return res.status(200).json({
                message: "Optimal timetable generated successfully!",
                fitnessOfOptimalTimetable: optimalTimetable.fitness,
            });
        } else {
            return res.status(400).json({ message: "No optimal timetable found." });
        }
    } catch (error) {
        console.error("Error during initialization:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const getTimetable = asyncHandler(async (req, res) => {
    const { email } = req.params;
    if (!email)
        res.status(404).json({ message: "Email is required" });
    try {
        const timetable = await Timetable.findOne({
            email: email,
        });
        if (!timetable) {
            return res.status(404).json({ message: "Timetable not found" });
        }
        function sortByDayAndRoom(a, b) {
            const dayComparison = daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);

            if (dayComparison !== 0) {
                return dayComparison; // If days are different, sort by day
            }

            // If days are the same, sort by room
            if (a.room < b.room) {
                return -1;
            } else if (a.room > b.room) {
                return 1;
            } else {
                return 0; // Same day and room
            }
        }
        const sortedTimetable = timetable.timetable.sort(sortByDayAndRoom);
        return res.status(200).json(
            sortedTimetable,
        );
    } catch (err) {
        console.log("Error in getting timetable", err);
        res.status(500).json({ message: "Internal Server Error" });

    }
});


const getAllTeachers = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        if (!email)
            res.status(404).json({ message: "Email is required" });
        const teachers = await Teacher.find({ email }).select("name -_id");

        const output = new Set();
        teachers.forEach((item) => {
            output.add(item.name);
        });
        return res.status(200).json(
            Array.from(output).sort(),
        );
    }
    catch (err) {
        console.log("Error in getting teachers", err);
        res.status(500).json({ message: "Internal Server Error" });
    }

});
const getAllClasses = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        if (!email)
            res.status(404).json({ message: "Email is required" });
        const cls = await Class.find({ email }).select("program_name session semester section -_id");
        const output = new Set();
        if (!cls) {
            return res.status(404).json({ message: "No classes found" });
        }
        cls.forEach((item) => {
            output.add(`${item.program_name}-${item.session}-${item.semester}-${item.section}`);
        });

        return res.status(200).json(
            Array.from(output).sort()
        );
    }
    catch (err) {
        console.log("Error in getting teachers", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const getAllCourses = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        if (!email)
            res.status(404).json({ message: "Email is required" });
        const courses = await Course.find({ email }).select("name -_id");
        if (!courses) {
            return res.status(404).json({ message: "No courses found" });
        }
        const output = [];
        courses.forEach((item) => {
            output.push(item.name);
        });
        return res.status(200).json(
            output.sort()
        );
    }
    catch (err) {
        console.log("Error in getting teachers", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const getAllRooms = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        if (!email)
            res.status(404).json({ message: "Email is required" });
        const rooms = await Rooms.find({ email }).select("rooms -_id");
        if (!rooms) {
            return res.status(404).json({ message: "No rooms found" });
        }
        const output = new Set();;
        rooms.forEach((item) => {
            output.add(item.rooms);
        });
        return res.status(200).json(
            Array.from(output).sort()
        );
    }
    catch (err) {
        console.log("Error in getting rooms", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const TeacherTimetableByNames = asyncHandler(async (req, res) => {
    const { email, name } = req.params;
    if (!email || !name) {
        return res.status(400).json({ message: "Email and name are required" });
    }
    try {
        const timetable = await Timetable.findOne({
            email: email,
        });
        if (!timetable) {
            return res.status(404).json({ message: "Timetable not found" });
        }
        const filteredTimetable = timetable.timetable.filter((item) => item.name === name);
        return res.status(200).json(
            filteredTimetable,
        );
    } catch (err) {
        console.log("Error in getting timetable", err);
        res.status(500).json({ message: "Internal Server Error" });

    }
});
const ClassTimetableByNames = asyncHandler(async (req, res) => {
    const { email, name } = req.params;

    // Check for missing parameters
    if (!email || !name) {
        return res.status(400).json({ message: "Email and name are required" });
    }

    try {
        // Find the timetable for the given email
        const timetable = await Timetable.findOne({
            email,
        });

        if (!timetable) {
            return res.status(404).json({ message: "Timetable not found" });
        }

        // Filter the timetable for items with class_assigned matching the name parameter
        const filteredTimetable = timetable.timetable.filter(
            (item) => item.class_assigned === name
        );

        // Return the filtered timetable
        return res.status(200).json(filteredTimetable);

    } catch (err) {
        console.error("Error in getting timetable", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const RoomTimetableByNames = asyncHandler(async (req, res) => {
    const { email, name } = req.params;

    // Check for missing parameters
    if (!email || !name) {
        return res.status(400).json({ message: "Email and name are required" });
    }

    try {
        // Find the timetable for the given email
        const timetable = await Timetable.findOne({
            email,
        });

        if (!timetable) {
            return res.status(404).json({ message: "Timetable not found" });
        }

        // Filter the timetable for items with class_assigned matching the name parameter
        const filteredTimetable = timetable.timetable.filter(
            (item) => item.room === name
        );

        // Return the filtered timetable
        return res.status(200).json(filteredTimetable);

    } catch (err) {
        console.error("Error in getting timetable", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});




module.exports = {
    addClass, addCourse, addTeacher, getCourses, getClasses, getTeachers, getClassesFromCourse, addrooms, getRooms,
    deleteClass, deleteCourse, deleteTeacher, deleteRoom, generateTimetable, getTimetable, getAllTeachers, getAllClasses, getAllCourses, getAllRooms,
    TeacherTimetableByNames, ClassTimetableByNames, RoomTimetableByNames
}