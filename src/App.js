import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home country="in" category="general" />} />
        <Route path='/business' element={<Home country="in" category="business" />} />
        <Route path='/entertainment' element={<Home country="in" category="entertainment" />} />
        <Route path='/health' element={<Home country="in" category="health" />} />
        <Route path='/science' element={<Home country="in" category="science" />} />
        <Route path='/sports' element={<Home country="in" category="sports" />} />
        <Route path='/technology' element={<Home country="in" category="technology" />} />

        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
