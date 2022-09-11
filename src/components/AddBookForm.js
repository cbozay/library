import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const AddBookForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bookName === "" || authorName === "" || category === "") {
      alert("It can not be empty!");
      return;
    }

    const newBook = {
      id: new Date().getTime(),
      name: bookName,
      author: authorName,
      isbn: isbn,
      categoryId: category,
    };
    axios
      .post("http://localhost:3004/books", newBook)
      .then(
        (res) => setBookName(""),
        setAuthorName(""),
        setIsbn(""),
        setCategory(""),
        navigate("/")
      )
      .catch((err) => console.log(err));
  };
  if (categories === null) {
    return <Loading />;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row g-3 my-5">
          <div className="col ">
            <input
              type="text"
              className="form-control"
              placeholder="Book Name"
              value={bookName}
              onChange={(event) => setBookName(event.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Author Name"
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
            />
          </div>
        </div>
        <div className="row g-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="ISBN"
              value={isbn}
              onChange={(event) => setIsbn(event.target.value)}
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
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center my-5">
          <button className="btn btn-outline-primary w-25" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
