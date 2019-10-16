import React from "react";
import styles from './Navigationitems.module.css';
import NavigationItem from './Navigationitem/Navigationitem';

const navigationitems=(props)=>{
    return (<ul className ={styles.NavigationItems}>
        <NavigationItem link="/home" exact >Burger Builder</NavigationItem>
        {props.isAuth ?<NavigationItem link="/orders">Orders</NavigationItem>:null}
        {!props.isAuth ? <NavigationItem link="/auth">Authenticate</NavigationItem>:
        <NavigationItem link="/logout">Logout</NavigationItem>}

    </ul>)
}

export default navigationitems;