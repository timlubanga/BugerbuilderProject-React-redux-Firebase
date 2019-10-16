import React from 'react';
import styles from './Logo.module.css';
import burger_img from '../../assets/images/burger-logo.png'

const logo=(props)=>{
 return (
    <div className={styles.Logo}>
    <img src={burger_img} alt="logo"/>
    </div>
 )
  }


export default logo;