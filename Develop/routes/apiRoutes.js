express.Router();
const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const router = express.Router();

// GET /api/notes
router.get("/api/notes", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
    } else {
      const notes = JSON.parse(data);
      res.json({ notes });
    }
  });
});
// POST /api/notes
router.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    id: uuid.v4(),
    title,
    text,
  };

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
    } else {
      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Server Error");
        } else {
          res.json(newNote);
        }
      });
    }
  });
});
module.exports = router;
