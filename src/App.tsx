import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { ParticlesBackground } from './components/ParticlesBackground';
import { Home } from './pages/Home';
import { SpeedTest } from './pages/SpeedTest';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
          <ParticlesBackground />
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<SpeedTest />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;