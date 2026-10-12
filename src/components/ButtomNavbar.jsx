import React from 'react';

const Input = () => {
  return (
    <form className="form relative">
      <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
        <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search" className="w-5 h-5" style={{ color: 'var(--text-muted, #6b7280)' }}>
          <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <input
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.08)',
          color: 'var(--text)',
        }}
        className="input rounded-full px-8 py-3 border focus:outline-none focus:border-[var(--primary)] placeholder-gray-500 transition-colors duration-300"
        placeholder="Search..."
        required
        type="text"
      />
      <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: 'var(--text-muted, #6b7280)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </form>
  );
};

export default Input;