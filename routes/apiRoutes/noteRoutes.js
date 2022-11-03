const path = require("path");
const router = require("express").Router();
const fs = require("fs");
const uuid = require("uuid");


router.get("/api/notes", (req, res) => {
    res.sendFile(path,join(__dirname, "../../db/db.json"));
});

router.post("api/notes", (req, res) => {
    const note = JSON.parse(fs.readFileSync("../../db/db.json"));
    const newNote = req.body;
    newNote.id = uuid.v4(); // add unique id to each note that is created
    note.push(newNote);
    fs.writeFileSync("../../db/db.json", JSON.stringify(note));
    res.JSON(note);
});

router.delete("api/notes/:id", (req, res) => {
    const note = JSON.parse(fs.readFileSync("../../db/db.json"));
    const deleteNote = note.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync("../../db/db.json", JSON.stringify(removeNote));
    res.JSON(removeNote);
});

module.exports = router;