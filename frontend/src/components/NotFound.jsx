import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-base sm:text-xl md:text-2xl font-bold font-mono text-center my-20 px-10 gap-8">
      <p>🚀 Don’t wait — create your first note now! 🖊️🔥</p>
      <Link to={'/create'} className="btn btn-primary rounded-full max-w-xs">
        Create your first note
      </Link>
    </div>
  );
};

export default NotFound;
