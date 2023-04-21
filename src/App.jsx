import axios from 'axios';
import './App.css';
import React from 'react';

function App() {
  let [index, setIndex] = React.useState(0);
  let [update, setUpdate] = React.useState(true);
  const [contact, setContact] = React.useState({});
  const [allContacts, setAllContacts] = React.useState([]);
  const [createInfo, setCreateInfo] = React.useState({
    name: 'Alab',
    phone: '234234',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await axios.get(`http://localhost:7070/api/contacts/${index}`);
    setContact(result.data);
  }

  function handleChange(e) {
    setIndex(e.target.value);
  }

  async function handleCreate(e) {
    e.preventDefault();
    await axios.post(
      'http://localhost:7070/api/contacts',
      axios.toFormData(createInfo)
    );
    setUpdate(!update);
  }

  function handleInfoChange(e) {
    setCreateInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  React.useEffect(() => {
    (async () => {
      let result = await axios.get('http://localhost:7070/api/contacts');
      setAllContacts(result.data);
    })();
  }, [update]);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <span>Index: </span>
        <input
          type='number'
          onChange={handleChange}
          value={index}
          name='index'
        />
        <button type='submit'>Query</button>
      </form>
      <h2>{contact.name}</h2>
      <h3>{contact.phone}</h3>

      <hr />

      <h1>Show All</h1>
      {allContacts.map((c) => (
        <h4 key={c.phone}>{`${c.name}  ${c.phone}`}</h4>
      ))}

      <hr />

      <h1>Create New Contact</h1>
      <form onSubmit={handleCreate}>
        <span>Name: </span>
        <input
          type='text'
          name='name'
          value={createInfo.name}
          onChange={handleInfoChange}
        />
        <br />
        <span>Phone: </span>
        <input
          type='text'
          name='phone'
          value={createInfo.phone}
          onChange={handleInfoChange}
        />
        <br />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}

export default App;
