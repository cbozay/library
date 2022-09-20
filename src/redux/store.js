import { combineReducers, createStore } from "redux";
import booksReducer from "./reducers/booksReducer";
import categoriesReducer from "./reducers/categoriesReducer";

const rootReducer = combineReducers({
  categoriesState: categoriesReducer,
  booksState: booksReducer,
});

const store = createStore(rootReducer);

export default store;
