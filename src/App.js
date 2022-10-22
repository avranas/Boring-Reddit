import './App.css';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import OptionsMenu from './components/OptionsMenu';
import PostList from './components/PostList';
import Post from './components/Post';
import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [ searchParams ] = useSearchParams({search: ''});

  return (
    <div>
      <header>
        <div id="search-logo-wrap">
          <Link to="/">
            <Logo />
          </Link>
          <SearchBar />
        </div>
        <OptionsMenu />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<h2>Search for a Subreddit</h2>}/>
          <Route path='/search-results' element={<PostList searchParams={searchParams.get('search')} />}/>
          <Route path='/post' element={<Post redditUrl={searchParams.get('redditUrl')} />}/>
        </Routes>
      </main>
      <footer>
        <p>Made with ❤️ by Alex Vranas</p>
      </footer>
    </div>
  );
}

export default App;

//TODO: What to make look better:
  //Make sure it looks good on mobile and tablet :(