import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import styles from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';
import {connect} from 'react-redux';

class Layout extends Component{
    state={
        opened:false
    }

backdrawerHandler=()=>{
    this.setState({opened:false})
}

toggleSiderawerHandler=()=>{
    this.setState((prevState)=>{
        return {opened:!prevState.opened}
    })
}
    render(){
        return (
            <Aux>
                <Toolbar toggleSidrawer={this.toggleSiderawerHandler} isAuth={this.props.isAuth}/>
                <Sidedrawer open={this.state.opened} sideshowhandle={this.backdrawerHandler} isAuth={this.props.isAuth}/>
                <main className={styles.Content}>{this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStatetoProps=(state)=>{
    return {
        isAuth:state.auth.token!==null
    }
}


export default connect(mapStatetoProps)(Layout);