const { error } = require("console");
const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => {
    return note.title === title;
  });
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("note added succesfully!"));
  } else {
    throw new Error(chalk.red("note already exists!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green("Note removed successfully!"));
  } else {
    throw new Error(chalk.red("Note not found!"));
  }
};

const getNotes = () => {
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.inverse(`Title: ${note.title}`));
    console.log(`Body : ${note.body}`);
  } else {
    throw new Error(chalk.red.inverse("note not found"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  loadNotes,
  getNotes,
  readNote,
};
