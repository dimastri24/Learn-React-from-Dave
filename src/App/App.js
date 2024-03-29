import { Header } from './Header';
import { SearchItem } from './SearchItem';
import { AddItem } from './AddItem';
import { Content } from './Content';
import { Footer } from './Footer';
import { useState, useEffect } from 'react'
import apiRequest from './apiRequest';

import "./App.css";

function App() {
  // const[items, setItems] = useState([
  //   {
  //     id: 1,
  //     checked: true,
  //     item: "One half pound bag of Cocoa"
  //   },
  //   {
  //     id: 2,
  //     checked: false,
  //     item: "Item 2"
  //   },
  //   {
  //     id: 3,
  //     checked: false,
  //     item: "Item 3"
  //   }
  // ]);
  const API_URL = 'http://localhost:3004/items';
  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || [])
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   localStorage.setItem('shoppinglist', JSON.stringify(items));
  // }, [items]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        // console.log(err.message);
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItem())();
    }, 2000);
  }, [])

  // const setAndSaveItems = (newItem) => {
  //   setItems(newItem);
  //   localStorage.setItem('shoppinglist', JSON.stringify(newItem));
  // }

  const addItem = async (item) => {
    const id = items.length ? items[items.length-1].id + 1 : 1;
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    };
    const result = await apiRequest(API_URL, postOption);
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id?
     {...item, checked: !item.checked} : item)
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOption = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOption);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    
    const deleteOption = {method: 'DELETE'};
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOption);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    // console.log(newItem)
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      
      <Header title="Grocery List"/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading &&<Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
