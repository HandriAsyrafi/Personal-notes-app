import { useEffect, useState } from "react";
import { getArchivedNotes } from "../utils/network-data";
import NotesList from "../components/NotesList";

export default function ArchivedNotesPage() {
  const [archivedNotes, setArchivedNotes] = useState(null);

  useEffect(() => {
    async function fetchArchivedNotes() {
      const { error, data } = await getArchivedNotes();
      if (!error) {
        setArchivedNotes(data);
      }
    }
    fetchArchivedNotes();
  }, []);

  return (
    <div className="note-app__body">
      <NotesList archivedNotes={archivedNotes}>Archived Notes</NotesList>
    </div>
  );
}
