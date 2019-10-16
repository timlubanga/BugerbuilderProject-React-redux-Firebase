import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';
import styles from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
const sidedrawer=(props)=>{
    let attachedClasses=[styles.SideDrawer, styles.Close]

    if (props.open){
        attachedClasses=[styles.SideDrawer, styles.Open]
    }
    return (
    <Aux>
        <Backdrop show={props.open} handleShow={props.sideshowhandle}></Backdrop>
        <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
        <Logo/>
        </div>
        <nav>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
        
    </div>
    </Aux>
        )
}

export default sidedrawer;