import React, { Component } from 'react';
import { db } from "../../libs/firebase";
import Aux from '../../hoc/_Aux'

import Plat from './Plat/Plat'
import { List, Card } from 'antd';
class Plats extends Component {
    constructor(props){
        super(props)
        //console.log('constructor',this.props.user)
        this.state = {
            plats: []
        }
        this.dbPlat = null;
        //this.mountdb(this.props.user);
    }

    mountdb = (user) => {
        console.log('[PLATS]','mountdb')
        this.dbPlat = db.ref().child("Plats/"+user);

        this.dbPlat.on("child_added", snapshot => {
            const snap = snapshot.val();
            const key = snapshot.key;
            //console.log('plat added',snap)
            this.setState((prevState) => {
                return {plats : [...prevState.plats, 
                                {
                                    Key: key,
                                    ...snap
                                   /*  Nom: snap.Nom,
                                    Categorie: snap.Categorie,
                                    Image: snap.Image,
                                    ImageSearch: snap.ImageSearch,
                                    Rating: snap.Rating */
                                }]} 
            }) 
        });
        console.log('[PLATS]','mountdb => out')
    }

    componentDidMount() {
        //console.log('[PLATS] componentDidMount' )
        
    }

    componentWillMount() {
        //console.log('[PLATS] componentWillMount' )
        this.setState({plats: []})
        this.mountdb(this.props.user)
    }

    componentWillUnmount() {
        //console.log('[PLATS] componentWillUnmount' )
        this.dbPlat = null;
    }

    
    componentDidUpdate(prevProps) {
        console.log('[PLATS]','componentDidUpdate',prevProps.user,this.props.user)
        if (prevProps.user.Nom !== this.props.user.Nom) {
            console.log('[PLATS]','componentDidUpdate',prevProps.user,this.props.user)
            
        }
    }

    render() { 
        return (  
        <Aux>
        <List
            grid={{gutter: 16, column:4}}
            dataSource={this.state.plats}
            renderItem={item => (
                <List.Item>
                    <Card title={item.Nom}
                    cover={<img alt={item.ImageSearch} src={item.Image}></img>}>

                    </Card>
                </List.Item>
            )}>

        </List> 
        </Aux> 
        );
    }
}
 
export default Plats;