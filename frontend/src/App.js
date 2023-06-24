import './App.css';
import { Button, Navbar, Container, Nav, Toast, ToastContainer } from 'react-bootstrap';
import Home from './pages/Home';
import Add from './pages/Add';
import { Route, Routes, Link} from 'react-router-dom';

function App() {
  return (


    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Application Dashboard</Navbar.Brand>
          <Link to="/add">
            <Button variant="primary">Add</Button>
          </Link>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>

  );
}

export default App;
