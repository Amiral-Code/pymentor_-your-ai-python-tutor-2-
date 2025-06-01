
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 text-slate-600 p-4 text-center text-sm border-t border-slate-200">
      © {new Date().getFullYear()} PyMentor. Learn Python with AI.
    </footer>
  );
};

export default Footer;