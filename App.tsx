
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/api';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { CaseStudy } from './pages/CaseStudy';
import { CaseStudyNoir } from './pages/CaseStudyNoir';
import { Admin } from './pages/Admin';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/noir/:slug" element={<CaseStudyNoir />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
