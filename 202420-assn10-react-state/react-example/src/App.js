import React, { useState } from 'react';
import './App.css';

const initialCourses = [
    {
        name: "1370",
        sections: [
            { id: 1, instructorId: 12 },
            { id: 2, instructorId: 2 }
        ]
    },
    {
        name: "2380",
        sections: [
            { id: 3, instructorId: 23 }
        ]
    }
];

const instructors = [
    { id: 12, name: 'Ayati' },
    { id: 2, name: 'Kim' },
    { id: 23, name: 'Schweller' },

];

let nextSectionId = 100;

function App() {
    const [courses, setCourses] = useState(initialCourses);
    const [newCourseName, setNewCourseName] = useState('');

    const handleAddCourse = (event) => {
        event.preventDefault();
        const newCourseId = nextSectionId++;
        if (newCourseName.trim() !== '') {
            const newCourse = {
                name: newCourseName,
                sections: []
            };
            setCourses([...courses, newCourse]);
            setNewCourseName('');
        }
    };

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
                    <Course
                        key={course.name + index}
                        courseData={course}
                        instructors={instructors}
                        setCourses={setCourses}
                    />
                ))}
                </tbody>
            </table>
            <form onSubmit={handleAddCourse} className="input-group mb-3" style={{ maxWidth: '300px' }}>
                <input
                    type="text"
                    placeholder="Course Number"
                    className="form-control"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Add Course</button>
            </form>
        </div>
    );

}

function Course({ courseData, instructors, setCourses }) {
    const [sections, setSections] = useState(courseData.sections);

    const handleInstructorChange = (sectionId, instructorId) => {
        setSections(sections.map(section =>
            section.id === sectionId ? { ...section, instructorId } : section
        ));
    };

    const handleDeleteSection = (sectionId) => {
        setSections(sections.filter(section => section.id !== sectionId));
    };

    const handleAddSection = (instructorId) => {
        const newSection = { id: nextSectionId++, instructorId };
        setSections([...sections, newSection]);
    };

    return (
        <tr>
            <td>{courseData.name}</td>
            <td>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    {sections.map(section => (
                        <Section
                            key={section.id}
                            section={section}
                            instructors={instructors}
                            onInstructorChange={handleInstructorChange}
                            onDelete={handleDeleteSection}
                        />
                    ))}
                    <select
                        className="form-select"
                        style={{ width: 'auto', marginLeft: '10px' }}
                        value={-1}
                        onChange={(e) => handleAddSection(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>Add Section</option>
                        {instructors.map(instructor => (
                            <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                        ))}
                    </select>
                </div>
            </td>
        </tr>
    );
}

function Section({ section, instructors, onInstructorChange, onDelete }) {
    return (
        <div className="d-flex align-items-center gap-2 mb-2">
            <select
                className="form-select"
                value={section.instructorId}
                onChange={(e) => onInstructorChange(section.id, parseInt(e.target.value))}
            >
                {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                ))}
            </select>
            <button className="btn btn-danger" onClick={() => onDelete(section.id)}>-</button>
        </div>
    );
}

export default App;
