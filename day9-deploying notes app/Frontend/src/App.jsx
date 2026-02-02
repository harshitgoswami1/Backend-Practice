import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test description",
    },
    {
      title: "test title 2",
      description: "test description",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">NOTES</h1>

      <div className="notes flex flex-wrap gap-4 justify-center">
        {notes.map((note, index) => (
          <div
            key={index}
            className="note bg-zinc-800 p-4 rounded-lg w-64 shadow-md hover:shadow-xl transition"
          >
            <h1 className="text-lg font-semibold mb-2">
              {note.title}
            </h1>
            <p className="text-zinc-300 text-sm">
              {note.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
