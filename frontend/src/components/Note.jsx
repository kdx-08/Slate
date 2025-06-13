import { Link } from 'react-router';
import { SquarePen, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Note = (props) => {
  const date = new Date(props.note.createdAt);

  const handleRemove = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this note?');
    if (confirm) {
      const res = await axios.delete(`http://localhost:5000/api/notes/${id}`);
      if (res.data.success) {
        props.setNotes((prev) => prev.filter((note) => note._id !== id));
        toast.success('Note deleted successfully!');
      } else {
        toast.error('An error occured');
      }
    }
  };

  return (
    <div className="card bg-base-300 border-t-2 p-4">
      <div className="mx-3 px-2 py-3">
        <div className="mb-8">
          <Link to={`/note/${props.note._id}`} className="text-primary font-bold font-mono">
            {props.note.title}
          </Link>
          <p className="text-slate-400">{props.note.content}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-500">
            {date.toDateString().slice(4, 10)}, {date.getFullYear()}
          </p>
          <div className="flex items-baseline gap-4">
            <Link to={`/note/${props.note._id}`}>
              <SquarePen size={20} className="text-xs text-slate-500" />
            </Link>
            <button onClick={() => handleRemove(props.note._id)}>
              <Trash2 size={20} className="text-xs text-error" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
