
import React from 'react';
import styles from  './DrawerToggle.module.css';

const toggleDrawer=(props)=>{
       return ( 
            <div className={styles.DrawerToggle} onClick={props.togglesidrawer} >
            <div></div>
            <div></div>
            <div></div>
            </div>
        
        )
        
}


export default toggleDrawer;