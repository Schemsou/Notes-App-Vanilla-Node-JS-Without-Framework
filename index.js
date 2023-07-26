const fs = require("fs");
const yargs = require("yargs");
const {
  addNote,
  removeNote,
  loadNotes,
  getNotes,
  readNote,
} = require("./notes");
const { argv } = require("process");

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "description add",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    try {
      addNote(argv.title, argv.body);
    } catch (error) {
      console.error(error.message);
    }
  },
});

yargs.command({
  command: "delete",
  describe: "delete note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    try {
      removeNote(argv.title);
    } catch (error) {
      console.log(error.message);
    }
  },
});

yargs.command({
  command: "getNotes",
  describe: "listing all notes",
  handler: () => {
    getNotes();
  },
});

yargs.command({
  command: "read",
  describe: "reading a note",
  builder: {
    title: {
      describe: "give a title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    try {
      readNote(argv.title);
    } catch (error) {
      console.log(error.message);
    }
  },
});

yargs.parse();
