const Joi = require('joi');

const express = require ('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'Complex System', code: '6CS014', level: '6' },
    {id: 2, name: 'High Performance Computing', code: '6CS014', level: '6' },
    {id: 3, name: 'Project and Professionalism', code: '6CS014', level: '6' },
    {id: 4, name: 'Artificial Intelligence and Machine Learning', code: '6CS014', level: '6' },
    {id: 5, name: 'Big Data', code: '6CS014', level: '6' }
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