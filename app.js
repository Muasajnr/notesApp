const express = require('express');
const bodyParser = require('body-parser');
const notes = [{
    noteId: 1,
    noteContent: 'Eeh Eeh Eeh Mai Lawd!'
}]


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.render('home', {data: notes});
});

app.post("/", (req, res) => { 
    const noteContent = req.body.noteContent 
    const noteId = notes.length + 1; 
  
    notes.push({ 
        noteId: noteId, 
        noteContent: noteContent 
    }) 
  
    res.render("home", { 
        data: notes 
    }) 
})

app.post('/update', (req, res) => {
    const noteId = req.body.noteId;
    const noteContent = req.body.noteContent;

    notes.forEach(note => {
        if (note.noteId == noteId) {
            note.noteContent = noteContent;
        }
    })
    res.render("home", {
        data: notes
    })
} )

app.post('/delete', (req, res) => {
    const noteId = req.body.noteId;
    notes.forEach((note, index) => {
        if (note.noteId == noteId) {
            notes.splice(index, 1);
        }
    })
    res.render("home", {
        data: notes
    })
} )

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});