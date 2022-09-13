import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";

const EditBook = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${params.bookId}`)
      .then((res) => {
        console.log(res.data);
        setBookName(res.data.name);
        setAuthorName(res.data.author);
        setIsbn(res.data.isbn);
        setCategory(res.data.categoryId);
        axios
          .get("http://localhost:3004/categories")
          .then((res) => setCategories(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bookName === "" || authorName === "" || category === "") {
      return alert("It can not be empty!");
    }
    const updatedBook = {
      id: params.bookId,
      name: bookName,
      author: authorName,
      isbn: isbn,
      categoryId: category,
    };
    axios
      .put(`http://localhost:3004/books/${params.bookId}`, updatedBook)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  if (categories === null) {
    return <Loading />;
  }
  return (
    <div>
      <Header />
      <form className="container my-5" onSubmit={handleSubmit}>
        <div className="row ">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Book name"
              value={bookName}
              onChange={(event) => {
                setBookName(event.target.value);
              }}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Author name"
              value={authorName}
              onChange={(event) => {
                setAuthorName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row  my-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="ISBN"
              value={isbn}
              onChange={(event) => {
                setIsbn(event.target.value);
              }}
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value={""}>Select a Category</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-danger col-3 mx-1"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button className="btn btn-outline-primary col-3 mx-1" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
