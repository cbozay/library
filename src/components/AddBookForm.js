import React from "react";

const AddBookForm = () => {
  return (
    <div className="container">
      <form>
        <div className="row g-3 my-5">
          <div className="col ">
            <input
              type="text"
              className="form-control"
              placeholder="Book Name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Author Name"
            />
          </div>
        </div>
        <div className="row g-3">
          <div className="col">
            <input type="text" className="form-control" placeholder="ISBN" />
          </div>
          <div className="col">
            <select className="form-select">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
