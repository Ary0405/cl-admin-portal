import './App.css';
import Admin from './Pages/Admin';
import Jury from './Pages/Jury';
import SignUp from './Pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/jury" element={<Jury />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
