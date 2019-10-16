
import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {setlogout, Initgredients} from '../../../store/actions/index';
import {connect} from 'react-redux'
import React from 'react';

class Logout extends Component{

    _isMounted=false;

    componentDidMount(){
        this._isMounted=true
        if (this._isMounted){
            this.props.logout()
        }  

    }

    componentWillUnmount(){
        this._isMounted=false
    }


    

    render(){
        return (<Redirect to="/home"/>)
    }
}


const mapDispatchtoProps=(dispatch)=>{
        return{
            logout:()=>dispatch(setlogout()),
            resetingredients:()=>dispatch(Initgredients())
        }
}


export default connect(null, mapDispatchtoProps)(Logout);