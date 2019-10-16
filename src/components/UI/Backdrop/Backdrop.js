import React from 'react';
import styles from './Backdrop.module.css';
const backdrop=(props)=>{
    const backdesplay=props.show ? <div className={styles.Backdrop} onClick={props.handleShow}>
    </div>:null
    return ( <div>
        {backdesplay}
    </div>
    );

}

export default backdrop;