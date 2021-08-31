const Joi = require('joi');

const express = require ('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'Complex System', code: '6CS014', level: '6' },
    {id: 2, name: 'High Performance Computing', code: '6CS005', level: '6' },
    {id: 3, name: 'Project and Professionalism', code: '6CS007', level: '6' },
    {id: 4, name: 'Artificial Intelligence and Machine Learning', code: '6CS012', level: '6' },
    {id: 5, name: 'Big Data', code: '6CS030', level: '6' },

    {id: 6, name: 'Concepts and Technologies of AI', code: '5CS037', level: '5' },
    {id: 7, name: 'Object-Oriented Design and Programming', code: '5CS019', level: '5' },
    {id: 8, name: 'Numerical Methods and Concurrency', code: '5CS021', level: '5' },
    {id: 9, name: 'Distributed and Cloud System Programming', code: '5CS022', level: '5' },
    {id: 10, name: 'Collaborative Development', code: '5CS024', level: '5' },
    {id: 11, name: 'Human Computer Interaction', code: '5CS020', level: '5' },

    {id: 12, name: 'Academic Skills and Team Based Learning', code: '4CI018', level: '4' },
    {id: 13, name: 'Introductory Programming and Problem Solving', code: '4CS001', level: '4' },
    {id: 14, name: 'Fundamentals of Computing', code: '4CS015', level: '4' },
    {id: 15, name: 'Embedded System Programming', code: '4CS014', level: '4' },
    {id: 14, name: 'Internet Software Architecture', code: '4CS017', level: '4' },
    {id: 15, name: 'Computational Mathematics', code: '4MM013', level: '4' }
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {

    const { error } = courseValidation(req.body);
    if (error){
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course is not available.')
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course is not available.')

    
    const { error } = courseValidation(req.body);
    if (error){
        res.status(400).send(result.error.details[0].message)
        return;
    }

    //update
    course.name = req.body.name;
    res.send(course);


})

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course is not available.')

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

})

function courseValidation(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);    
}



const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`listening on port ${port} ...`))