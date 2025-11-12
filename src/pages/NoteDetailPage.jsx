import { useNavigate, useParams } from "react-router";
import {
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../utils/network-data";
import { useContext, useEffect, useState } from "react";
import { showFormattedDate } from "../utils/network-data";
import LocalContext from "../contexts/LocalContext";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const { locale } = useContext(LocalContext);

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    async function fetchNote() {
      const { error, data } = await getNote(id);
      if (!error) {
        setNote(data);
      }
    }
    fetchNote();
  }, [id]);

  if (!note) {
    return <p>Loading...</p>;
  }

  function handleArchive(id) {
    archiveNote(id);
    navigate("/");
  }

  function handleUnarchive(id) {
    unarchiveNote(id);
    navigate("/");
  }

  function handleDelete(id) {
    deleteNote(id);
    navigate("/");
  }

  return (
    <>
      <div className="note-detail-container">
        <h1 className="note-detail-title">{note.title}</h1>
        <p className="note-detail-date">
          {showFormattedDate({ date: note.createdAt })}
        </p>
        <p className="note-detail-body">{note.body}</p>
        <div className="note-item__action">
          <button
            onClick={
              note.archived
                ? () => handleUnarchive(note.id)
                : () => handleArchive(note.id)
            }
            className="note-item__archive-button"
          >
            {note.archived
              ? locale === "id"
                ? "Batal Arsipkan"
                : "Cancel"
              : locale === "id"
              ? "Arsipkan"
              : "Archive"}
          </button>
          <button
            onClick={() => handleDelete(note.id)}
            className="note-item__delete-button"
          >
            {locale === "id" ? "Hapus" : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
}
