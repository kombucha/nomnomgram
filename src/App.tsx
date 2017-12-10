import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import EditPage from "./pages/Edit";

import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/edit" component={EditPage} />
          <Redirect to="/edit" />
        </Switch>
      </div>
    );
  }
}

export default App;
