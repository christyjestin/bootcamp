import React from "react";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1'},
        { front: 'front2', back: 'back2'}
      ],
      editor: true,
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
    if (this.state.editor){
      return (<CardEditor
        addCard = {this.addCard}
        cards = {this.state.cards}
        deleteCard = {this.deleteCard}
        switchMode = {this.switchMode}/>
        );
    }
    else {
      return (<CardViewer
        cards = {this.state.cards}
        switchMode = {this.switchMode}
        randomizeCards = {this.randomizeCards}
      />);
    }
  }
}

export default App;
