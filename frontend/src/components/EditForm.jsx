import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MoveLeftIcon, Trash2Icon } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router';

const EditForm = ({ note, setLoading }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState(note.title ?? '');
  const [content, setContent] = useState(note.content ?? '');

  useEffect(() => {
    setTitle(note.title ?? '');
    setContent(note.content ?? '');
  }, [note]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const res = await axios.put(`http://localhost:5000/api/notes/${id}`, { title, content });
    if (res.data.success) {
      toast.success('Note updated!');
      setTitle('');
      setContent('');
      setLoading(false);
      navigate('/');
    } else {
      toast.error('Error occurred!');
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this note?');
    if (confirm) {
      const res = await axios.delete(`http://localhost:5000/api/notes/${id}`);
      if (res.data.success) {
        toast.success('Note deleted successfully!');
        navigate('/');
      } else {
        toast.error('An error occured');
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto mt-8 flex justify-between">
        <Link to={'/'}>
          <span className="btn btn-ghost rounded-full">
            <MoveLeftIcon size={20} /> Back to Notes
          </span>
        </Link>
        <button onClick={() => handleRemove(id)}>
          <span className="btn btn-error btn-outline rounded-full">
            <Trash2Icon size={20} /> Delete Note
          </span>
        </button>
      </div>
      <form
        action={handleUpdate}
        className="w-full max-w-5xl grid grid-cols-1 mx-auto bg-base-300 rounded-2xl my-10 p-5"
      >
        <div>
          <h3 className="font-bold font-mono text-2xl text-primary my-5 text-center">
            Update Note
          </h3>
        </div>
        <label htmlFor="title" className="font-semibold font-mono mr-8 mb-3">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Note title"
          onChange={handleTitleChange}
          value={title}
          required
          className="validator input mb-8"
        />
        <label htmlFor="content" className="font-semibold font-mono mr-8 mb-3">
          Content
        </label>
        <textarea
          type="text"
          id="content"
          name="content"
          placeholder="Write your notes here..."
          onChange={handleContentChange}
          value={content}
          required
          className="validator textarea mb-8"
        ></textarea>
        <button
          className="btn btn-block btn-primary rounded-full mb-8 max-w-md justify-self-center"
          type="submit"
        >
          Update Note
        </button>
      </form>
    </>
  );
};

export default EditForm;
