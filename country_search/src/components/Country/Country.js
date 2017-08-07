import React, { Component } from 'react';
import styles from './Country.css';
export default class Country extends Component {


    render() {
        return (
            <li className="Results_List_Item">
                <span className="Results_List_Item_Element" >{this.props.name}</span>
                <span className="Results_List_Item_Element" >{this.props.alpha2Code}</span>
                <span className="Results_List_Item_Element" >{this.props.alpha3Code}</span>
                <span className="Results_List_Item_Element" >
                    <img src={this.props.flag} alt="Flag of {this.props.name}" height="60px" width="100px"></img>
                </span>
                <span className="Results_List_Item_Element" >{this.props.region}</span>
                <span className="Results_List_Item_Element" >{this.props.subregion}</span>
                <span className="Results_List_Item_Element" >{this.props.population}</span>
                <span className="Results_List_Item_Element" >{JSON.stringify(this.props.languages)}</span>
            </li>
        )
    }

}
