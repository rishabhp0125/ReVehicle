import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import './App.css';
import Header from './components/Header';
import CarPage from "./pages/CarPage";
import CarsListPage from './pages/CarsListPage';
import { Login } from "./pages/Login";
import  { Register }  from "./pages/Register"
import React, { useState } from 'react'

function App() {

  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <Router>
      <Switch>
        <div className="container dark">
          <div className="app">
            <Header />
            <Route path="/" exact>
              {currentForm === 'login' ? (
                <Login onFormSwitch={toggleForm} />
              ) : (
                <Register onFormSwitch={toggleForm} />
              )}
            </Route>
            <Route path="/cars" exact component={CarsListPage} />
            <Route path="/cars/:id" component={CarPage} />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
