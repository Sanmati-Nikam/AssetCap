import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login, Home, Signup } from './components/pages';
import LandingPage from './components/pages/LandingPage';
import Navbar from './components/elements/Navbar';

function App() {
  return (
    <div className="App">
    <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
