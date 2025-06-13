import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Create from './pages/Create';
import Details from './pages/Details';

const App = () => {
  return (
    <div data-theme="night">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
