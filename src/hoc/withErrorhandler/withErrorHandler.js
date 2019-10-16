import React,{Component} from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler=(WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error:null
        }

        componentDidMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req
            });

            axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            })

        }

        errorConfirmed=()=>{
            this.setState({error:null})
        }

        render(){

            return (
            <Aux>
                <Modal 
                    handleShow={this.errorConfirmed}
                    show={this.state.error}
                    >
                        {this.state.error ? this.state.error.message:null}
                        <div style={{height:"5vh",textAlign:"right", position:"relative"}}>
                        <button 
                        style={{position:"absolute",
                            right:"0px",bottom:"0px",
                            margin:"5px", display:"inline-block",
                            padding:"5px",backgroundColor:"orange",
                            boxShadow: "5px 2px 10px rgba(0, 0, 0, 0.2)",
                            borderStyle:"none"}} 
                        onClick={this.errorConfirmed}>CANCEL</button>
                        </div>
                </Modal>
                <WrappedComponent {...this.props}/>


            </Aux>

            );

        }
    }
}


export default withErrorHandler;