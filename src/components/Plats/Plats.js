import React, { Component } from 'react';
import { db } from "../../libs/firebase";
import Aux from '../../hoc/_Aux'

import Plat from './Plat/Plat'

class Plats extends Component {
    constructor(props){
        super(props)
        //console.log('constructor',this.props.user)
        this.state = {
            plats: []
        }
        this.dbPlat = null;
        this.mountdb(this.props.user);
    }

    mountdb = (user) => {
        this.dbPlat = db.ref().child("Plats/"+user);

        this.dbPlat.on("child_added", snapshot => {
            const snap = snapshot.val();
            const key = snapshot.key;
            //console.log('plat added',snap)
            this.setState((prevState) => {
                return {plats : [...prevState.plats, 
                                {
                                    Key: key,
                                    Nom: snap.Nom,
                                    Categorie: snap.Categorie,
                                    Image: snap.Image,
                                    ImageSearch: snap.ImageSearch,
                                    Rating: snap.Rating
                                }]} 
            }) 
          });

    }
    componentDidUpdate(prevProps) {
        //console.log('prevProps.user',prevProps.user)
        //console.log('props.user',this.props.user)
        if (prevProps.user !== this.props.user) {
            this.setState({plats: []})
            this.mountdb(this.props.user)
        }
    }

    render() { 
        return (  
           <Aux>
               {this.state.plats.map((plat) => {
                   //console.log(plat)
                 return (<Plat key={plat.Key} plat={plat}></Plat>)
                 })
               }
           </Aux> 
        );
    }
}
 
export default Plats;