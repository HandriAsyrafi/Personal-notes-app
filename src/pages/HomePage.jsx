import { useEffect, useState } from "react";
import { getActiveNotes } from "../utils/network-data";
import NoteInput from "../components/NoteInput";
import NotesList from "../components/NotesList";

export default function HomePage() {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchActiveNotes() {
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
      setLoading(false);
    }
    fetchActiveNotes();
  }, []);

  return (
    <>
      <NoteInput />
      <NotesList notes={notes} loading={loading}>
        Active Notes
      </NotesList>
    </>
  );
}
