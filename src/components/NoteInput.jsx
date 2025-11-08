import { useContext } from "react";
import LocalContext from "../contexts/LocalContext";
import useInput from "../hooks/useInput";
import { addNote } from "../utils/network-data";

export default function NoteInput() {
  const [title, handleChangeTitle] = useInput("");
  const [body, handleChangeBody] = useInput("");

  const { locale } = useContext(LocalContext);

  function handleAddNote() {
    addNote({ title, body });
  }

  return (
    <div className="note-app__body">
      <form
        onSubmit={handleAddNote}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          gap: "0px",
          margin: "0 auto",
        }}
      >
        <h1>{locale === "id" ? "Tambah Catatan" : "Add Note"}</h1>
        <input
          type="text"
          name="title"
          value={title}
          placeholder={locale === "id" ? "Judul catatan ..." : "Note title ..."}
          onChange={handleChangeTitle}
        />
        <textarea
          type="text"
          name="body"
          value={body}
          placeholder={locale === "id" ? "Isi catatan ..." : "Note content ..."}
          onChange={handleChangeBody}
          className="note-input__body"
        />
        <button>{locale === "id" ? "Tambah catatan" : "Add Note"}</button>
      </form>
    </div>
  );
}
