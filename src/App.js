import './App.css';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import OptionsMenu from './components/OptionsMenu';
import PostList from './components/PostList';
import Post from './components/Post';
import { Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div>
      <header>
        <div className="search-logo-wrap">
          <Link to="/">
            <Logo />
          </Link>
          <SearchBar />
        </div>
        <OptionsMenu />
      </header>
      <main>
        <Button>my butt</Button>
        <Routes>
          <Route path='/' element={<h2>Search for a Subreddit</h2>}/>
          <Route path='/search' element={<PostList />}/>
          <Route path='/post' element={<Post />}/>
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;

//todo tell user that the page is loading
