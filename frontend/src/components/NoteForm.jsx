import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MoveLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const NoteForm = ({ setLoading }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('/api/notes', { title, content });
      toast.success('Note added!');
      setTitle('');
      setContent('');
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Error occurred!');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto mt-8">
        <Link to={'/'}>
          <span className="btn btn-ghost rounded-full">
            <MoveLeftIcon size={20} /> Back to Notes
          </span>
        </Link>
      </div>
      <form
        action={handleSubmit}
        className="w-full max-w-5xl grid grid-cols-1 mx-auto bg-base-300 rounded-2xl my-10 p-5"
      >
        <div>
          <h3 className="font-bold font-mono text-2xl text-primary my-5 text-center">
            Create New Note
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
          Create Note
        </button>
      </form>
    </>
  );
};

export default NoteForm;
