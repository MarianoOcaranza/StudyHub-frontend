const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/assets', express.static('./assets'));

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/how-it-works', (req, res) => {
    res.sendFile(path.join(__dirname, 'how-it-works.html'));
    
});

app.get('/reference', (req, res) => {
    res.sendFile(path.join(__dirname, 'reference.html'));
    
});


app.get('/user/courses', (req, res) => {
    res.sendFile(path.join(__dirname, 'courses.html'));
});

app.get('/user/courses/:id', (req, res) => {
    const idCourse = req.params.id;
    res.sendFile(path.join(__dirname, 'detail.html'));
});


app.get('/user/courses/:id/exam-ai', (req, res) => {
    res.sendFile(path.join(__dirname, 'choice.html'));
});

app.listen(port, 'localhost', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});