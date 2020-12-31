import React from "react";
import './CardEditor.css';

import {Link, withRouter} from "react-router-dom";
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';
class CardEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {cards: [
            { front: 'front1', back: 'back1', starred: false},
            { front: 'front2', back: 'back2', starred: false}
          ], front: '', back: '', deckName: '', desc: ''};

    }
    
    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({cards});
      };
    addCard = () => {
        if (this.state.front.slice().trim()!=='' && this.state.back.slice().trim()!==''){
            const card ={front : this.state.front, back : this.state.back, starred: false};
            const cards = this.state.cards.slice().concat(card);
            this.setState({cards});
            this.setState({front: '', back: ''});
        }
    };

    addDeck = () => {
        if (this.state.deckName.slice().trim() && !this.state.front.slice().trim() && !this.state.back.slice().trim() && this.state.cards.length){
            const deckId = this.props.firebase.push('/flashcards').key;
            const Deck = {cards: this.state.cards, name: this.state.deckName, desc: this.state.desc, saved: false};
            const onComplete = () => {
                console.log("Database Updated");
                this.props.history.push(`/viewer/${deckId}`);
            };
            var updates={};
            updates[`/flashcards/${deckId}`]=Deck;
            updates[`/homepage/${deckId}`]={ name: Deck["name"], desc: Deck["desc"], saved:Deck["saved"]};
            this.props.firebase.update("/", updates, onComplete);
        }
    };

    editCard = index => {
        this.setState({front: this.state.cards[index].front, back: this.state.cards[index].back});
        this.deleteCard(index);
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };
    render() {
        const cards = this.state.cards.map((card, index) =>{
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button onClick = {() => {this.deleteCard(index)}}>Delete Card</button>
                    </td>
                    <td>
                        <button onClick = {() => {this.editCard(index)}}>Edit Card</button>
                    </td>
                </tr>
            );
        });
    
    



        return (<div>
            <h2>Card Editor</h2>
            <table>
                <thead>
                    <tr>
                        <th>Card</th>
                        <th>Front</th>
                        <th>Back</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>{cards}</tbody>
            </table>
            <br/>
            <input
            name = 'front'
                onChange={this.handleChange}
                placeholder="Front of Card"
                value={this.state.front} />
            <input
            name = 'back'
                onChange={this.handleChange}
                placeholder="Back of Card"
                value={this.state.back} />
            <button onClick={this.addCard}>Add Card</button>
            <br/>
            <br/>
            <input
            name = 'deckName'
                onChange={this.handleChange}
                placeholder="Name of Deck"
                value={this.state.deckName} />
            
            <input
            name = 'desc'
                onChange={this.handleChange}
                placeholder="Deck Description"
                value={this.state.desc} />
            <button onClick={this.addDeck}>Add Deck</button>
            <br/>
            <Link to="/">Home</Link>
        </div>);

        }
    }

export default compose(firebaseConnect(), withRouter)(CardEditor);