import React from "react";
import './CardEditor.css';
class CardEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = { front: '', back: ''};

    }

    addCard = () => {
        if (this.state.front.slice().trim()!=='' && this.state.back.slice().trim()!==''){
            this.props.addCard(this.state);
            this.setState({front: '', back: ''});
        }
    };

    deleteCard = index => this.props.deleteCard(index);

    editCard = index => {
        this.setState({front: this.props.cards[index].front, back: this.props.cards[index].back});
        this.props.deleteCard(index);
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };
    render() {
        const cards = this.props.cards.map((card, index) =>{
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
            <hr/>
            <button onClick={this.props.switchMode}>Go to Card Viewer</button>
        </div>);

        }
    }

export default CardEditor;