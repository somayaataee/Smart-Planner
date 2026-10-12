import SideBar from "../components/layout/Sidebar";
import ButtomNavbar from "../components/ButtomNavbar";
import { useState } from "react";

export default function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectNote, setSelectNote] = useState(null);
  const [showForm, setShowForm] = useState(false);

  //---------------------save the notes
  const handleSave = () => {
    if (title.trim() === "" || content.trim() === "") return;

    if (selectNote) {
      const updateNote = notes.map((note) =>
        note.id === selectNote.id ? { ...note, title, content } : note
      );
      setNotes(updateNote);
      setSelectNote(null);
    } else {
      const newNotes = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([newNotes, ...notes]);
    }
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  //---------------------Delete Notes
  function handleDeleteNote(id) {
    const updateNote = notes.filter((note) => note.id !== id);

    setNotes(updateNote);
    if (selectNote?.id === id) {
      setSelectNote(null);
      setTitle("");
      setContent("");
      setShowForm(false);
    }
  }

  //-------------------Handle Notes
  const handleSeletedNote = (note) => {
    setShowForm(true);
    setSelectNote(note);

    setTitle(note.title);
    setContent(note.content);
  };

  // ------------------------add Note
  function handleNewNote() {
    setShowForm(true);
    setSelectNote(null);
    setTitle("");
    setContent("");
  }

  return (
    <div
      style={{ background: "var(--bg)", color: "var(--text)" }}
      className="flex min-h-screen"
    >
      <SideBar />

      <main className="flex-1 flex flex-col min-w-0 p-3 sm:p-4 md:p-8 overflow-auto pb-28 md:pb-8">
        {/* ----------Header ---------- */}
        <div
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
          className="flex flex-col gap-4 rounded-3xl border backdrop-blur-xl shadow-2xl px-4 py-5 sm:px-6 sm:py-6 md:px-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
              My Notes
            </h1>
            <p className="text-sm mt-1 opacity-70">
              Capture your thoughts and ideas.
            </p>
          </div>

          <button
            onClick={handleNewNote}
            style={{ backgroundColor: "var(--primary)" }}
            className="rounded-xl active:scale-95 transition-all duration-300 px-5 py-3 sm:px-6 font-semibold shadow-lg text-black self-start sm:self-auto"
          >
            + New Note
          </button>
        </div>

        {/* ----------Form + Notes ---------- */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6 md:mt-8">
          {showForm && (
            <div
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
              className="w-full lg:flex-1 lg:max-w-xl border rounded-3xl backdrop-blur-xl shadow-2xl p-4 sm:p-6 md:p-8 self-start"
            >
              <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ borderColor: "var(--border)" }}
                className="w-full rounded-xl border bg-white/10 px-4 py-3 placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />

              <textarea
                placeholder="Write your notes..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ borderColor: "var(--border)" }}
                className="mt-4 w-full h-56 sm:h-72 rounded-xl border bg-white/10 px-4 py-3 placeholder:text-gray-400 outline-none resize-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              ></textarea>

              <div className="mt-5 flex flex-col-reverse sm:flex-row gap-3">
                <button
                  style={{ background: "var(--primary)" }}
                  className="px-5 py-2 rounded-lg font-semibold text-black"
                  onClick={handleSave}
                >
                  {selectNote ? "Update" : "Save"}
                </button>
                <button
                  className="border px-5 py-2 rounded-lg"
                  style={{ borderColor: "var(--border)" }}
                  onClick={() => {
                    setShowForm(false);
                    setTitle("");
                    setContent("");
                    setSelectNote(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            {notes.length === 0 && !showForm && (
              <div
                style={{
                  borderColor: "var(--border)",
                  background: "var(--card)",
                }}
                className="rounded-3xl border border-dashed backdrop-blur-xl p-10 text-center shadow-xl"
              >
                <div className="text-6xl mb-5">📝</div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  No Notes Yet
                </h2>
                <p className="mt-3 opacity-60 text-sm">
                  Click "New Note" to create your first note.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => handleSeletedNote(note)}
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                  className={`
                    group
                    min-h-56
                    flex
                    flex-col
                    justify-between
                    rounded-3xl
                    border
                    p-5 sm:p-6
                    cursor-pointer
                    transition-all
                    duration-300
                    shadow-xl
                    hover:-translate-y-2
                    hover:shadow-2xl
                    ${
                      selectNote?.id === note.id
                        ? "border-blue-500 ring-2 ring-blue-500/30"
                        : "hover:opacity-90"
                    }
                  `}
                >
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <span
                        style={{ color: "var(--primary)" }}
                        className="text-xs uppercase tracking-widest"
                      >
                        Note
                      </span>
                      <span
                        style={{ background: "var(--primary)" }}
                        className="w-2 h-2 rounded-full"
                      ></span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold truncate">
                      {note.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 line-clamp-3 opacity-80">
                      {note.content}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    className="mt-5 self-start rounded-xl px-4 py-2 text-sm text-red-400 bg-red-500/15 hover:bg-red-500/25 transition-all"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ButtomNavbar />
    </div>
  );
}