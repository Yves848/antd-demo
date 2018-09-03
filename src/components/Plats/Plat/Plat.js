import React, { Component } from 'react';
import Aux from '../../../hoc/_Aux'

import { List, Card } from 'antd';

class Plat extends Component {
    constructor(props) {
        super(props)
    }

    render() { 
        const {plat} = this.props;
        //console.log('plat',plat)
        return (  
            <div>
                <p>{plat.Nom}</p>
            </div>
        );
    }
}
 
export default Plat;