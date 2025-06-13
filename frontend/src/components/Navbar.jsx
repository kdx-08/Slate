import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-base-300 ">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex justify-between">
          <Link
            to={'/'}
            className="text-3xl font-bold text-primary font-mono flex justify-center items-center"
          >
            Slate
          </Link>
          <Link className="btn btn-primary rounded-full" to={'/create'}>
            <PlusIcon className="size-4" />
            New Note
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
