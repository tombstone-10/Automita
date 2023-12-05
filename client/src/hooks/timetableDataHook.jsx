import { createContext, useState } from 'react';


const TimetableContext = createContext();
const TimetableProvider = ({ children }) => {
    const [classes_addition, set_classes_addition] = useState([{ program_name: 'BSSE', session: 'Fall', semester: '1', section: 'A' },
    { program_name: 'BSSE', session: 'Fall', semester: '1', section: 'A' },
    { program_name: 'BSSE', session: 'Fall', semester: '3', section: 'A' },
    { program_name: 'BSSE', session: 'Fall', semester: '5', section: 'A' },
    { program_name: 'BSSE', session: 'Fall', semester: '7', section: 'A' },
    { program_name: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
    { program_name: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
    { program_name: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
    { program_name: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
    { program_name: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
    { program_name: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
    { program_name: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
    { program_name: 'BSSE', session: 'Fall', semester: '7', section: 'B' },
    ]);
    const [course_addition, set_course_addition] = useState([
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE336', course_name: 'Mobile Application Development', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE464', course_name: 'Big Data Analytics', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE421', course_name: 'Software Project Management', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },
        { course_code: 'SE301', course_name: 'Software Re-Engineering', credit_hour: '3', assigned_to: 'BSSE-7-A, BSSE-7-B' },

    ]);
    const [teacher_addition, set_teacher_addition] = useState([
        {
            teacher_name: 'Dr. Iqbal Murtaza', assigned_classes: 'BSSE-F-3-B, BSSE-F-3-A',
            assigned_courses: 'Data Structures & Algorithms, Formal Methods in Software'
        },
        {
            teacher_name: 'Mr. Adnan Aslam', assigned_classes: 'BSSE-F-3-B, BSSE-F-3-A',
            assigned_courses: 'Mobile Application Development, Big Data Analysis'
        },
        {
            teacher_name: 'Dr. Iqbal Murtaza', assigned_classes: 'BSSE-F-3-B, BSSE-F-3-A',
            assigned_courses: 'Data Structures & Algorithms, Formal Methods in Software'
        },
        {
            teacher_name: 'Dr. Iqbal Murtaza', assigned_classes: 'BSSE-F-3-B, BSSE-F-3-A',
            assigned_courses: 'Data Structures & Algorithms, Formal Methods in Software'
        },


    ])
    const [room_addition, set_room_addition] = useState([
        { room_no: '401' },
        { room_no: '402' },
        { room_no: '403' },
        { room_no: '404' },
        { room_no: '405' },
        { room_no: '406' },
        { room_no: '407' },
        { room_no: '401 - Lab' }
    ])


    return (
        <TimetableContext.Provider value={{ classes_addition, set_classes_addition, course_addition, set_course_addition, teacher_addition, set_teacher_addition, room_addition, set_room_addition}}>
            {children}
        </TimetableContext.Provider>
    );
};

export { TimetableContext, TimetableProvider };