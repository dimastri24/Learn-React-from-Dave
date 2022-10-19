import React from 'react'
import Feed from './Feed'
// import { useContext } from 'react'
// import DataContext from '../context/DataContext'
import { useStoreState } from 'easy-peasy';

const Home = ({isLoading, fetchError}) => {
  // const {searchResult, fetchError, isLoading} = useContext(DataContext);
  const searchResults = useStoreState((state) => state.searchResults);

  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && <p className="statusMsg" style={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults}/>
      : <p className="statusMSG">No post to display!</p>)}
      {/* {posts.length ? (
        <Feed posts={posts}/>
      ) : (
        <p style={{marginTop: "2rem"}}>
          No Post to display.
        </p>
      )} */}
    </main>
  )
}

export default Home
