import { useEffect, useState } from "react";
import { getActiveNotes } from "../utils/network-data";
import NoteInput from "../components/NoteInput";
import NotesList from "../components/NotesList";

export default function HomePage() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    async function fetchActiveNotes() {
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
    }
    fetchActiveNotes();
  }, []);

  return (
    <>
      <NoteInput />
      <NotesList notes={notes}>Active Notes</NotesList>
    </>
  );
}
