import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKS_START" });
    axios
      .get("http://localhost:3004/books")
      .then((res) =>
        dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data })
      )
      .catch((err) =>
        dispatch({ type: "FETCH_BOOKS_FAIL", payload: "sdfsdffdsfsdf" })
      );
    dispatch({ type: "FETCH_CATEGORIES_START" });
    axios
      .get("http://localhost:3004/categories")
      .then((res) =>
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: res.data })
      )
      .catch((err) =>
        dispatch({ type: "FETCH_CATEGORIES_FAIL", payload: "srfşsklrkjf" })
      );
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
