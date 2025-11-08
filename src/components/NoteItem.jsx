import { useContext } from "react";
import LocalContext from "../contexts/LocalContext";
import { showFormattedDate } from "../utils/network-data";
import { Link } from "react-router";

export default function NoteItem({ id, title, body, createdAt }) {
  const { locale } = useContext(LocalContext);
  return (
    <div className="note-item">
      <div className="note-item__content">
        <Link to={`/notes/${id}`} className="link">
          <p className="note-item__title">{title}</p>
          <p className="note-item__date">
            {showFormattedDate({ locale, date: createdAt })}
          </p>
          <p className="note-item__body">{body}</p>
        </Link>
      </div>
    </div>
  );
}
