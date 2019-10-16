import React from "react";
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';
import ToggleSidrawer from '../Sidedrawer/DrawerToggle/DrawerToggle';
const toolbar=(props)=>{
    return(<header className={styles.Toolbar}>
        <ToggleSidrawer togglesidrawer={props.toggleSidrawer}/>
        <div className={styles.Logo}>
        <Logo/>
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>)
}

export default toolbar;