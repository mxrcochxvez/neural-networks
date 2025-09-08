import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import XorDemo from './pages/XORDemo';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/xor" element={<XorDemo />} />
      </Routes>
    </BrowserRouter>
  );
}
