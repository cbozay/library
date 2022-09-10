import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ListBooks = () => {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [didDelete, setDidDelete] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3004/books")
      .then((resb) => {
        console.log(resb);

        setBooks(resb.data);

        axios
          .get("http://localhost:3004/categories")
          .then((resc) => {
            setCategories(resc.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [didDelete]);
  const bookDelete = (id) => {
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => setDidDelete(!didDelete))
      .catch((err) => console.log(err));
  };
  if (books === null || categories === null) {
    return (
      <div className="my-5">
        <Loading />
      </div>
    );
  }
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-end mx-3 my-3">
        <Link to="/add-book" className="btn btn-md btn-dark">
          Add Book
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">AUTHOR</th>
            <th scope="col">CATEGORY</th>
            <th scope="col" className="text-center">
              ISBN
            </th>
            <th scope="col" className="text-center">
              PROCESS
            </th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => {
            const category = categories.find(
              (cat) => cat.id === book.categoryId
            );
            return (
              <tr>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{category.name}</td>
                <td className="text-center">
                  {book.isbn === "" ? "-" : book.isbn}
                </td>
                <div
                  className="btn-group d-flex justify-content-center"
                  role="group"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      bookDelete(book.id);
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;
