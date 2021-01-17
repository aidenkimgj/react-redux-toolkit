import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Home, Detail } from "../routes/index";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} exact />
      <Route path="/:id" component={Detail} exact />
    </Router>
  );
}

export default App;
