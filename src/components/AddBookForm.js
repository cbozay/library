import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";

const AddBookForm = () => {
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  const navigate = useNavigate();
  // const [categories, setCategories] = useState(null);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // axios
    //   .get("http://localhost:3004/categories")
    //   .then((res) => {
    //     setCategories(res.data);
    //   })
    //   .catch((err) => console.log(err));
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
        (res) => dispatch({ type: "EDIT_BOOK", payload: newBook }),
        navigate("/"),
        setBookName(""),
        setAuthorName(""),
        setIsbn(""),
        setCategory("")
      )
      .catch((err) => console.log(err));
  };
  if (categoriesState.success !== true) {
    return <Loading />;
  }
  return (
    <div className="container my-5 ">
      <form onSubmit={handleSubmit}>
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
              {categoriesState.categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary col-3" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
