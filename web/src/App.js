import './App.css';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import PostForm from './components/PostForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PostList />} />
          <Route exact path="/posts/:id" element={<PostDetails />} />
          <Route exact path="/posts/:id/edit" element={<PostForm editMode={true}/>} />
          <Route exact path="/new-post" element={<PostForm/>} />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
