import './App.css';

import Home from './pages/Home';
import Add from './pages/Add';
import { Route, Routes, Link} from 'react-router-dom';

import Navheader from './components/Navheader';

function App() {
  return (


    <div className="App">

      <Navheader />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>

  );
}

export default App;
