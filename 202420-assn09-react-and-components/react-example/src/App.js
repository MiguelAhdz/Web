import React from 'react';
import './App.css';

const courses = [
    { name: "1370", sections: [{ id: 1, instructorId: 12 }, { id: 2, instructorId: 2 }] },
    { name: "3329", sections: [{ id: 3, instructorId: 7 }, { id: 4, instructorId: 31 }, { id: 5, instructorId: 31 }] },
    { name: "3340", sections: [{ id: 6, instructorId: 23 }, { id: 7, instructorId: 3 }] }
];

const instructors = [
    { id: 12, name: 'Ayati' },
    { id: 7, name: 'Gao' },
    { id: 2, name: 'Kim' },
    { id: 23, name: 'Schweller' },
    { id: 31, name: 'Tomai' },
    { id: 3, name: 'Wylie' }
];

function Course({ name, sections }) {
    const sectionNames = sections.map(section => {
        const instructor = instructors.find(instructor => instructor.id === section.instructorId);
        return instructor ? instructor.name : 'Unknown';
    }).join(' ');

    return (
        <tr>
            <td>{name}</td>
            <td>{sectionNames}</td>
        </tr>
    );
}

function App() {
    return (
        <div className="container mt-5">
            <h1>Build-A-Schedule</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Course</th>
                    <th>Sections</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course, index) => (
                    <Course key={index} name={course.name} sections={course.sections} />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
