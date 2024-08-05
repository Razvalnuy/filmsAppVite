import { applyMiddleware, combineReducers, createStore } from "redux";
import { filtersReducer } from "./filtersReducer";
import { userReducer } from "./userReducer";
import { thunk } from "redux-thunk";

const rootStore = combineReducers({
  user: userReducer,
  filters: filtersReducer,
});

const store = createStore(rootStore, applyMiddleware(thunk));

export { store, rootStore };
