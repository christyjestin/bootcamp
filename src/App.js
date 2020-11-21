import React from "react";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";
import {Route, Switch} from "react-router-dom";
import Homepage from "./Homepage";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1'},
        { front: 'front2', back: 'back2'}
      ],
    };
  }

  randomizeCards = () => {
    const cards = this.state.cards.slice();
    for(let i = cards.length-1; i > 0; i--){
      const j = Math.floor(Math.random() * i);
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    this.setState({cards});
  };

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({cards});
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({cards});
  };
  
  switchMode = () => {
    if (this.state.cards.length!==0){
    this.setState({editor:!this.state.editor});
    }
  };
  render() {
    return(
      <Switch>
        <Route exact path = "/editor">
        <CardEditor
        addCard = {this.addCard}
        cards = {this.state.cards}
        deleteCard = {this.deleteCard}
      />
        </Route>
        <Route exact path = "/viewer">
        <CardViewer
        cards = {this.state.cards}
        randomizeCards = {this.randomizeCards}
      />
        </Route>
        <Route exact path = "/">
          <Homepage/>
        </Route>
      </Switch>
    );
  }
}

export default App;
