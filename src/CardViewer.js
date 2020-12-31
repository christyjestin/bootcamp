import React from "react";
import './CardViewer.css';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
// import {}

class CardViewer extends React.Component {
    constructor(props){
        super(props);
        this.state = {starIndices: {},current: 0, side: true, starMode: false};
    }
    randomizeCards = () => {
        if (isLoaded(this.props.cards)){
            const cards = this.props.cards.slice();
            for(let i = cards.length-1; i > 0; i--){
                const j = Math.floor(Math.random() * i);
                const temp = cards[i];
                cards[i] = cards[j];
                cards[j] = temp;
                if (i===1){
                    this.props.firebase.set(`/flashcards/${this.props.deckId}/cards`, cards, ()=>{
                        if (!this.state.starMode){
                            this.setState({current: 0});
                        }
                        else {
                            this.setIndices();
                        }
                        this.setState({side: true});
                    });
                }
            }
        }
    };
    flipCard = () => {
        this.setState({side: !this.state.side});
    };

    nextCard = () => {
        if (!this.state.starMode){
            if (this.state.current!==this.props.cards.length-1){
                this.setState({current: this.state.current+1});
                this.setState({side: true});
            }
        }
        else {
            if (this.state.current!==this.state.starIndices['max']){
                this.setState({current: this.state.starIndices['list'][this.state.starIndices['list'].indexOf(this.state.current)+1]});
                this.setState({side: true});
            }
        }
    };

    prevCard = () => {
        if (!this.state.starMode){
            if (this.state.current!==0){
                this.setState({current: (this.state.current-1)});
                this.setState({side: true});
            }
        }
        else {
            if (this.state.current!==this.state.starIndices['min']){
                this.setState({current: this.state.starIndices['list'][this.state.starIndices['list'].indexOf(this.state.current)-1]});
                this.setState({side: true});
            }
        }  
    };
    
    saveDeck = () => {
        var updates={};
        updates[`/flashcards/${this.props.deckId}/saved`]=!this.props.saved;
        updates[`/homepage/${this.props.deckId}/saved`]=!this.props.saved;
        this.props.firebase.update("/", updates);
    };

    starCard = () => {
        this.props.firebase.set(`/flashcards/${this.props.deckId}/cards/${this.state.current}/starred`, !this.props.cards[this.state.current].starred);
    };
    
    changeMode = () => {
        if(this.state.starMode){
            this.setState({current: 0});
            this.setState({starMode: !this.state.starMode});
        }
        else{
            this.setIndices();
            this.setState({starMode: !this.state.starMode});
        }
        this.setState({side: true});
    };

    setIndices = () => {
        var indices = {};
        indices['min']=0;
        indices['list']=[];
        for(let i = 0; i < this.props.cards.length; i++){
            if (this.props.cards[i].starred){
                if (!indices['list'].length){
                    indices['min']=i;
                }
                indices['list'].push(i);
                indices['max']=i;
            }
        }
        this.setState({starIndices: indices},()=>{
                this.setState({current: this.state.starIndices['min']});
        });
        
    };

    render() {
        if (!isLoaded(this.props.cards)){
            return <div>Loading...</div>;
        }

        if (isEmpty(this.props.cards)){
            return <div>Page Not Found</div>;
        }
        const show = this.state.side ? this.props.cards[this.state.current].front : this.props.cards[this.state.current].back;
        let savedisplay;
        if (!this.props.saved){
            savedisplay = "Save this Deck";
        }
        else {
            savedisplay = "Unsave this Deck";
        }
        let stardisplay;
        if (!this.props.cards[this.state.current].starred){
            stardisplay = "Star Card";
        }
        else {
            stardisplay = "Unstar Card";
        }
        let modedisplay;
        if (!this.state.starMode){
            modedisplay = "Show Starred Cards Only";
        }
        else {
            modedisplay = "Show All Cards";
        }
        if (!this.state.starMode){
        return (
            <div>
                <div>
                <h2>{this.props.name}</h2>
                <small>Description: {this.props.desc}</small></div>
                <br/>
                <p>{show}</p>
                <div>Card {this.state.current+1}/{this.props.cards.length}</div>
                <button onClick={this.flipCard}>Flip Card</button>
                <button onClick={this.prevCard}>Previous Card</button>
                <button onClick={this.nextCard}>Next Card</button>
                <button onClick={this.starCard}>{stardisplay}</button>
                <br/>
                <br/>
                <button onClick={this.randomizeCards}>Randomize Cards</button>
                <button onClick={this.changeMode}>{modedisplay}</button>
                <button onClick={this.saveDeck}>{savedisplay}</button>
                <hr/>
                <Link to="/">Home</Link>
            </div>
        );
        }
        else {
            if (!this.state.starIndices['max']){
                return (
                    <div>
                        <div>
                        <h2>{this.props.name}</h2>
                        <small>Description: {this.props.desc}</small></div>
                        <br/>
                        <div>No Starred Cards</div>
                        <br/>
                        <button onClick={this.changeMode}>{modedisplay}</button>
                        <button onClick={this.saveDeck}>{savedisplay}</button>
                        <hr/>
                        <Link to="/">Home</Link>
                    </div>
                );
            }
            else{
                return (
                    <div>
                        <div>
                        <h2>{this.props.name}</h2>
                        <small>Description: {this.props.desc}</small></div>
                        <br/>
                        <p>{show}</p>
                        <div>Card {this.state.starIndices['list'].indexOf(this.state.current)+1}/{this.state.starIndices['list'].length}</div>
                        <button onClick={this.flipCard}>Flip Card</button>
                        <button onClick={this.prevCard}>Previous Card</button>
                        <button onClick={this.nextCard}>Next Card</button>
                        <br/>
                        
                        <button onClick={this.randomizeCards}>Randomize Cards</button>
                        <button onClick={this.changeMode}>{modedisplay}</button>
                        <button onClick={this.saveDeck}>{savedisplay}</button>
                        <hr/>
                        <Link to="/">Home</Link>
                    </div>
                );
            }
        }
    }
}

const mapStateToProps = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    const desc = deck && deck.desc;
    const saved = deck && deck.saved;
    return {cards: cards, name: name, desc: desc, saved: saved, deckId: props.match.params.deckId};
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        console.log('props', props)
        const deckId = props.match.params.deckId;
        return [{path: `/flashcards/${deckId}`, storeAs: deckId }]
    }),
    connect(mapStateToProps))(CardViewer);