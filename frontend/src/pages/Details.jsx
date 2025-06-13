import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../components/Navbar';
import EditForm from '../components/EditForm';
import axios from 'axios';

const Details = () => {
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getNote = async () => {
      const rawData = (await axios.get(`http://localhost:5000/api/notes/${params.id}`)).data
        .message;
      setNote(rawData);
    };
    getNote();
  }, [params.id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <span className="loading loading-lg loading-spinner text-primary"></span>
        </div>
      ) : note ? (
        <EditForm note={note} setLoading={setLoading} />
      ) : null}
    </div>
  );
};

export default Details;
