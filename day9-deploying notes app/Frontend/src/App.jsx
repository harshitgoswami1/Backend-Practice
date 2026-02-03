import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);

        fetchNotes();
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleDelete(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  return (
    <div className="min-h-screen bg-zinc-700 text-zinc-100 p-6">

            <h1 className="text-4xl font-bold mb-6 text-center">NOTES</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mb-8 bg-zinc-800 p-4 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-semibold mb-4 text-center">Add New Note</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full mb-3 p-2 rounded bg-zinc-700 text-white outline-none"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full mb-3 p-2 rounded bg-zinc-700 text-white outline-none"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-zinc-200"
        >
          Add Note
        </button>
      </form>



      <div className="notes flex flex-wrap gap-4 justify-center">
        {notes.map((note, index) => (
          <div
            key={index}
            className="note bg-zinc-800 p-4 rounded-lg w-64 shadow-md hover:shadow-xl transition"
          >
            <h1 className="text-lg font-semibold mb-2">{note.title}</h1>
            <p className="text-zinc-300 text-sm">{note.description}</p>
            <button
              onClick={() => handleDelete(note._id)}
              className="border-white text-sm border-2 p-1 mt-5 rounded-md bg-white text-black"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setEditNoteId(note._id);
                console.log(editNoteId);
              }

              }
              className="border-white text-sm border-2 p-1 mt-5 ml-4 rounded-md bg-white text-black"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
