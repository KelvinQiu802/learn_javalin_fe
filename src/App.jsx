import axios from 'axios';
import './App.css';
import React from 'react';

function App() {
  let [index, setIndex] = React.useState(0);
  let [contact, setContact] = React.useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await axios.get(`http://localhost:7070/api/contacts/${index}`);
    setContact(result.data);
  }

  function handleChange(e) {
    setIndex(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>Index: </span>
        <input type='number' onChange={handleChange} value={index} />
        <button type='submit'>Query</button>
      </form>

      <h1>{contact.name}</h1>
      <h2>{contact.phone}</h2>
    </div>
  );
}

export default App;
