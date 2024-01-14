import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import OptionsMenu from "./components/OptionsMenu";
import PostList from "./components/PostList";
import Post from "./components/Post";
import {
  Routes,
  Route,
  Link,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [searchParams] = useSearchParams({ search: "" });

  return (
    <div>
      <header>
        <div id="search-logo-wrap">
          <Link to="/">
            <div id="logo" />
          </Link>
          <SearchBar />
        </div>
        <OptionsMenu />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/search-results?search=all" />}
          />
          <Route
            path="/search-results"
            element={<PostList searchParams={searchParams.get("search")} />}
          />
          <Route
            path="/post"
            element={<Post redditUrl={searchParams.get("redditUrl")} />}
          />
        </Routes>
      </main>
      <footer>
        <p>
          Made with ❤️ by <a href="https://github.com/avranas">Alex Vranas</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
