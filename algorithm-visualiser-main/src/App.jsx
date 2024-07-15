import './App.css'
import Graphs from './pages/Graphs';
import Sorting from './pages/Sorting';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/graphs" element={<Graphs />} />
          <Route exact path="/sorting" element={<Sorting />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
