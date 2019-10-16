import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import {connect} from "react-redux";
import {setgetorders} from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
class Orders extends Component{

    state={
        show:true
    }
 _isMounted=false;
 componentDidMount(){
    //[ {ingre:{b:1,c:2},price:3,id:eff}]

    this._isMounted=true;
    if(this._isMounted){
        this.props.setorders(this.props.authToken);

    }
}

componentWillUnmount(){
this._isMounted=false
}
onhandleShow=()=>{
    this.setState({show:false})
    console.log(this.props)
    this.props.history.push("/home")
}

render(){
    
    let orders=<Spinner/>
    if (this.props.orders.length){
        orders=this.props.orders.map(el=>{
            return <Order key={el.id} ingredient={el.ingredients} price={el.price}/>
        })
    }

    if(this.props.error){
        orders=(
            
            <Modal show={this.state.show} handleShow={this.onhandleShow}>
                  <p>{this.props.error}</p>
            </Modal>
        )
        
    }
    
        return (
            <div>
            {orders}  
            </div>
        );

    }
}

const mapStatetoProps=(state)=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        error:state.order.error,
        authToken:state.auth.token

    }
}

const mapDispatchtoProps=(dispatch)=>{
    return{
        setorders:(auth)=>dispatch(setgetorders(auth))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Orders);