import React from "react";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";
import {Route, Switch} from "react-router-dom";
import Homepage from "./Homepage";
import User from "./User";
import Test from "./Test";

const App = () => {
    return(
      <Switch>
        <Route exact path = "/editor">
        <CardEditor/>
        </Route>
        <Route exact path = "/viewer/:deckId">
        <CardViewer/>
        </Route>
        <Route exact path = "/">
          <Homepage/>
        </Route>
        <Route path = "/user/:name">
          <User />
        </Route>
        <Route path = "/test/:name">
          <Test />
        </Route>
        <Route>
          <div>Page Not Found</div>
        </Route>
      </Switch>
    );
  };


export default App;
