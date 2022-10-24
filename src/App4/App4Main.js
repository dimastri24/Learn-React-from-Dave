import React from 'react'
// import Header from './Header'
// import Nav from './Nav'
// import Footer from './Footer'
import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import EditPost from './EditPost'
import About from './About'
import Missing from './Missing'
import { Route, Routes } from 'react-router-dom'
// import { DataProvider } from '../context/DataContext'
import { useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch'
import { useStoreActions } from 'easy-peasy'

function App4Main() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3004/posts');

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])

  return (
    <div className="App">
      {/* <Header title="React JS Blog"/> */}
        {/* <DataProvider> */}
        {/* <Nav/> */}
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home 
              isLoading={isLoading} 
              fetchError={fetchError} 
            />}>
          </Route>
          <Route path="post">
            <Route index element={<NewPost/>}/>
            <Route path=":id" element={<PostPage/>}/>
          </Route>
          <Route path="edit/:id" element={<EditPost/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="*" element={<Missing/>}/>
        </Route>
      </Routes>
        {/* </DataProvider> */}
      {/* <Footer/> */}
    </div>
  )
}

export default App4Main;