import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/search";
import Nav from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import Saved from "./pages/saved";
import Header from "./components/Header"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Header />
        <Switch>
          <Route exact path="/api/books" component={Search} />
          <Route exact path="/api/books/:id" component={Saved} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
