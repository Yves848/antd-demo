import React, { Component } from 'react';
import { db } from "../../libs/firebase";
import Aux from '../../hoc/_Aux'

import Plat from './Plat/Plat'
import './Plats.css'
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
        //console.log('[PLATS]','mountdb')
        this.dbPlat = db.ref().child("Plats/"+user);

        this.dbPlat.on("value", snapshot => {
            const snap = snapshot.val();
            const key = snapshot.key;
            console.log(snap)
            const plats = Object.keys(snap).map(i => {
                return (
                    {
                        key: i,
                        ...snap[i]
                    }
                )
            })

            this.setState((prevState) => {
                return {plats : [...prevState.plats, 
                                ...plats
                                ]} 
            }) 
        });
        //console.log('[PLATS]','mountdb => out')
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
        //console.log('[PLATS]','componentDidUpdate',prevProps.user,this.props.user)
        if (prevProps.user.Nom !== this.props.user.Nom) {
            //console.log('[PLATS]','componentDidUpdate',prevProps.user,this.props.user)
            
        }
    }

    render() { 
        const gridprop = {
            gutter: 6, 
            column: this.props.maxCols
        }
        return (  
        <Aux>
        <List
            grid={gridprop}
            dataSource={this.state.plats}
            renderItem={item => (
                <List.Item>
                    <Card title={item.Nom}
                    cover={<img className="imgPlat" alt={item.ImageSearch} src={item.Image}></img>}>

                    </Card>
                </List.Item>
            )}>

        </List> 
        </Aux> 
        );
    }
}
 
export default Plats;