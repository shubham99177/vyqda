import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import prisma from "./prisma.js";
import cors from "cors"; // Import Prisma Client

const app = express();
app.use(express.json());
app.use(cors());

// Create a new Note
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await prisma.note.create({
      // Make sure 'note' is lowercase as defined in the Prisma schema
      data: { title, content },
    });
    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await prisma.note.findMany(); // Make sure 'note' is lowercase
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a Note by ID
app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Note (edit title or content)
app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await prisma.note.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Note
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    });
    if (!note) return res.status(404).json({ error: "Note not found" });

    await prisma.note.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
