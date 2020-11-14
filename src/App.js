import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import CreateAdminUser from "./components/create-adminUser.component";
import history from "./history";
import RegisterModal from "./components/auth.js/RegisterModal";

import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { loadUser } from "./actions/authActions";
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);
  const store = createStore(
    allReducers,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="container">
          <NavBar />
          <br />
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
          <Route path="/adminUsers" component={CreateAdminUser} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
