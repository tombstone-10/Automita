import { createContext, useState } from 'react';


const TimetableContext = createContext();
const TimetableProvider = ({ children }) => {
    const [classes_addition, set_classes_addition] = useState([
    ]);
    const [course_addition, set_course_addition] = useState([
    ]);
    const [teacher_addition, set_teacher_addition] = useState([

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