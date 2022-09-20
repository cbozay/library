const initialState = {
  start: false,
  success: false,
  books: [],
  fail: false,
  errorMesage: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_START":
      return {
        ...state,
        start: true,
      };
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        start: false,
        success: true,
        books: action.payload,
      };
    case "FETCH_BOOKS_FAIL":
      return {
        ...state,
        start: false,
        fail: true,
        errorMesage: action.payload,
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case "DELETE_BOOK":
      const filteredBook = state.books.filter(
        (item) => item.id != action.payload
      );
      return {
        ...state,
        books: filteredBook,
      };
    case "EDIT_BOOK":
      const filteredEditBook = state.books.filter(
        (item) => item.id != action.payload.id
      );
      return {
        ...state,
        books: [...filteredEditBook, action.payload],
      };

    default:
      return state;
  }
};

export default booksReducer;
