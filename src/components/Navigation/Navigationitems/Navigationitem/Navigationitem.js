import React from 'react';
import styles from './Navigationitem.module.css';
import {NavLink} from 'react-router-dom';

const navigationitem=(props)=>{
    return(<li className={styles.NavigationItem}>
        <NavLink to={props.link} activeClassName={styles.active}>
                {props.children}
        </NavLink>
        </li>)
    }


export default navigationitem;