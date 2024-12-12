import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);

    const addNoteHandler = async () => {
        try {
            const response = await axios.post('http://localhost:3000/notes', {
                title,
                content,
            });
            console.log(response.data.message);
            toast.success(response.data.message);
            setTitle('');
            setContent('');
            fetchNotes();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/notes/${noteId}`);

            toast.success('Note deleted successfully');
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Notes App</h1>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded mb-3"
                    />
                    <textarea
                        placeholder="Note content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded mb-3"
                        rows="4"
                    />
                    <button
                        onClick={addNoteHandler}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Note
                    </button>
                </div>

                <div>
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="bg-gray-50 border border-gray-200 rounded mb-4 p-4"
                        >
                            <h3 className="text-lg font-semibold text-gray-700">{note.title}</h3>
                            <p className="text-gray-600 mt-2">{note.content}</p>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddNote;
