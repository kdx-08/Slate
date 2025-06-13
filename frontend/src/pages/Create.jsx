import { useState } from 'react';
import Navbar from '../components/Navbar';
import NoteForm from '../components/NoteForm';

const Create = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <span className="loading loading-lg loading-spinner text-primary"></span>
        </div>
      ) : (
        <NoteForm setLoading={setLoading} />
      )}
    </div>
  );
};

export default Create;
