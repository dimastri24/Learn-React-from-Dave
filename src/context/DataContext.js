// after all that refactoring to using easy-peasy lib
// this file are no longer needed and can be delete
// async are also no longer needed in each function handling

// this are the context management
// a refactor of moving out all the state and function from the app file, including prop drilling
// in this context management, we also can refactor again for effectiveness
// because context are being used to all component who are calling
// if something from the context are not needed but being called to into that component than its not good
// we can move it out the things that only that component are using
// all left is cleaning up the prop drilling in the app
// than update the component by delete the prop
// import the context and define the context 

import { createContext, useState, useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch'

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3004/posts');

  useEffect(() => {
    setPosts(data);
  }, [data])

  // useEffect are no longer needed since using custom hook useAxiosFetch
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       setPosts(response.data);
  //     } catch (err) {
  //       if(err.response) {
  //         // Not in the 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   }

  //   fetchPosts();
  // }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

    return(
        <DataContext.Provider value={{
            search, setSearch, searchResults,
            fetchError, isLoading, setPosts,
            posts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;