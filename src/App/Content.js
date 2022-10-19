import React from 'react'
import { ItemList } from './ItemList'

export const Content = ({items, handleCheck, handleDelete}) => {

  return(
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{marginTop: '2rem'}}>Your list is empty!</p>
      )}
    </>
  )


  // const[name, setName] = useState('Dimas');
  // const[count, setCount] = useState(0);

  // const handleNameChange = () => {
  //   const names = ['Bob', 'Kevin', 'Peter', 'Dimas']
  //   const int = Math.floor(Math.random() * 4);
  //   setName(names[int]);
  // }

  // const handleClick = () => {
  //   setCount(count + 1);
  //   setCount(count + 1);
  //   console.log(count);
  // }

  // const handleClick2 = () => {
  //   console.log(count);
  // }

  // return (
  //   <main>
  //       <p onDoubleClick={handleClick}>
  //         Hello {name}!
  //       </p>
  //       <button onClick={handleNameChange}>Change Name</button>
  //       <button onClick={handleClick}>Click It too!</button>
  //       <button onClick={handleClick2}>Click this too!</button>
  //   </main>
  // )
}
