const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');


async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString()
    };
    notes.unshift(note);
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added!'));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes))? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlue('Here is the list of notes'));
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title));
    });
}

async function removeNotes(id) {
    const notes = await getNotes();
    const indexNote = notes.findIndex((note) => {
        return note.id === id
    });
    notes.splice(indexNote, 1);
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgRed(`Note was remove`))
}

async function editNotes(id, editNote) {
    const notes = await getNotes();
    const indexNote = notes.findIndex((note) => {
        return note.id === id
    });
    notes[indexNote].title = editNote;
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgBlue(`Note was edit`))
}
module.exports = {
    addNote, getNotes, printNotes, removeNotes, editNotes
}