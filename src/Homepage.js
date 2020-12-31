import React from "react";
//import './Homepage.css';
import { connect } from "react-redux";
import {firebaseConnect, isLoaded} from "react-redux-firebase";
import {compose} from 'redux';

import {Link} from "react-router-dom";

class Homepage extends React.Component {

    render() {
        if (!isLoaded(this.props.homepage)){
            return<div>Loading...</div>;
        }
        var pages=[];
        Object.keys(this.props.homepage).forEach(page=>{
            if (this.props.homepage[`${page}`].saved){
                pages.push(page);
            }
        });
        Object.keys(this.props.homepage).forEach(page=>{
            if (!this.props.homepage[`${page}`].saved){
                pages.push(page);
            }
        });
        const links = pages.map((page, index) =>{
            return (
                <tr key={index}>
                    <td>{this.props.homepage[`${page}`].name}</td>
                    <td>{this.props.homepage[`${page}`].desc}</td>
                    <td><Link to={`/viewer/${page}`}>View</Link></td>
                </tr>
            );
        });
        return (
            <div>
                <p><Link to="/editor">Go to Card Editor</Link></p>
            <p>Card Viewer Links</p>
            <table>
                <thead>
                    <tr>
                        <th>Deck Name</th>
                        <th>Description</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>{links}</tbody>
            </table>
            </div>
        );

        }
    }
    const mapStateToProps = (state) => {
        const homepage = state.firebase.data.homepage;
        return {homepage: homepage};
    }
    export default compose(firebaseConnect(["/homepage"]),connect(mapStateToProps))(Homepage);