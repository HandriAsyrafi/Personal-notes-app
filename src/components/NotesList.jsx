import LocalContext from "../contexts/LocalContext";
import { useContext } from "react";
import NoteItem from "./NoteItem";

export default function NotesList({ notes, archivedNotes, children }) {
  const { locale } = useContext(LocalContext);

  const filteredNotes = children === "Active Notes" ? notes : archivedNotes;
  return (
    <div className="note-app__body">
      <h1>
        {children === "Active Notes"
          ? locale === "id"
            ? "Catatan aktif"
            : "Active Notes"
          : locale === "id"
          ? "Catatan tersimpan"
          : "Archived Notes"}
      </h1>
      <div className="notes-list">
        {filteredNotes?.length > 0 ? (
          filteredNotes?.map((note) => <NoteItem key={note.id} {...note} />)
        ) : (
          <p>
            {locale === "id"
              ? "Tidak ada catatan ditemukan."
              : "No notes found."}
          </p>
        )}
      </div>
    </div>
  );
}
