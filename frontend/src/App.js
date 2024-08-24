// src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/hello')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Message from Backend:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
