import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextConv from './TextConv';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TextConv />} />
      </Routes>
    </Router>
  );
}

export default App;

