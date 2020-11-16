import React from "react";
import './CardViewer.css';

class CardViewer extends React.Component {
    constructor(props){
        super(props);
        this.state = {current: 0, side: true, show: this.props.cards[0].front};
    }
    /*randomizeCards = () => this.props.randomizeCards();*/

    flipCard = () => {
        this.setState({side: !this.state.side});
    };

    nextCard = () => {
        if (this.state.current!==this.props.cards.length-1){
            this.setState({current: this.state.current+1});
        }
    };

    prevCard = () => {
        if (this.state.current!==0){
            this.setState({current: (this.state.current-1)});
        }
    };

    render() {
        const show = this.state.side ? this.props.cards[this.state.current].front : this.props.cards[this.state.current].back;
        return (
            <div>
                <h2>Card Viewer</h2>
                <body>{show}</body>
                <body>Card {this.state.current+1}/{this.props.cards.length}</body>
                <button onClick={this.flipCard}>Flip Card</button>
                <button onClick={this.prevCard}>Previous Card</button>
                <button onClick={this.nextCard}>Next Card</button>
                <hr/>
                <button onClick={this.props.switchMode}>Go to Card Editor</button>
            </div>
        )
    }
}

export default CardViewer;