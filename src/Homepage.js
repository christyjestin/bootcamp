import React from "react";
//import './Homepage.css';

import {Link} from "react-router-dom";

class Homepage extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        
        return (
            <body>
                <p><Link to="/editor">Go to Card Editor</Link></p>
            <p><Link to="/viewer">Go to Card Viewer</Link></p>
            </body>
            
            
        );

        }
    }

export default Homepage;