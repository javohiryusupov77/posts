import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();
  const api_url = "https://backend-server-8fqz.onrender.com";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${api_url}/items`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network error: ${errorText}`);
        }
        const newItems = await response.json();
        setPosts(newItems);
      } catch (error) {
        console.error("Error fetching items", error.message);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await fetch(`${api_url}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network error: ${errorText}`);
      }
      const postedPost = await response.json();
      const allPosts = [...posts, postedPost];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (error) {
      console.error("Error posting new item", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${api_url}/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network error: ${errorText}`);
      }
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      navigate("/");
    } catch (error) {
      console.error("Error deleting item", error.message);
    }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
