import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Note from '../components/Note';
import NotFound from '../components/NotFound';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        const data = response.data.message;
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };
    getNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl mx-auto my-5 :">
        {!loading && notes.map((note) => <Note key={note._id} note={note} setNotes={setNotes} />)}
      </div>
      {!loading && !notes.length && <NotFound />}
    </div>
  );
};

export default Home;
