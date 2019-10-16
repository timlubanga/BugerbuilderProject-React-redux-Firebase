
import React, {Component} from 'react';
import styles from './signup.module.css';
import Input from '../../components/signupfield/sigupfield';
import Button from '../../components/UI/Button/Button';
import {auth_account} from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/spinner/Spinner';
import {Redirect} from 'react-router-dom'

class Signup extends Component{


    state={
        Onswitchlogin:false,
        signupform:{
             Email:{ 
                elementType:"input",
                elementConfig:{
                    type:"email",
                    placeholder:"Email"
                         },
                validation:{
                    required:true,
                    minLength:6
                },
                isValid:false,
                value:''
                },
                Password:{ 
                    elementType:"input",
                    elementConfig:{
                        type:"password",
                        placeholder:"password"
                            },
                    validation:{
                        required:true,
                        minLength:6
                            },
                    isValid:false,
                    value:''
                
        }
    }
}


validatefield=(type,value, rules)=>{
    const emailreg=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid=false;
    if(rules.required){
        if(value.trim().length>=rules.minLength){
            isValid=true;
            
        }

        if(type==="email" && !emailreg.test(value)){
            isValid=false;
        }

        if(type==="password" && isValid){
            isValid=true
        }
    }

    

    return isValid;

}
inputHandler=(event,type)=>{
    const inputType=this.state.signupform[type].elementConfig.type;
    const value= event.target.value;
    const rules=this.state.signupform[type].validation

    const input={...this.state.signupform,
                [type]:{...this.state.signupform[type],
                value:value,
                isValid:this.validatefield(inputType,value,rules)}}
    this.setState({signupform:input})

   
    
}

formvalidity=()=>{

    ///[true,true,false,true]
    let valid=true;
    for (let value of Object.values(this.state.signupform)){
        if (value.isValid && valid){
            valid=true
        }
        else{
            valid=false
        }
    }

    return valid;
}
inputhandlerSubmit=async (e)=>{
    e.preventDefault()
    const values={};
    for (let key in this.state.signupform){
       values[key]=this.state.signupform[key].value
    }

    await this.props.setauth(values,this.state.Onswitchlogin);
    

     this.setState({signupform:{...this.state.signupform,
        Email:{...this.state.signupform.Email, value:"", isValid:false}, 
        Password:{...this.state.signupform.Password,
            value:"", isValid:false}
        }
    })
    
}

componentDidUpdate(){
    console.log(this.props.iserror)
        if (this.props.iserror){
        this.props.history.push("/auth")

    }
}



formArray=()=>{

    const Formlist=Object.keys(this.state.signupform).map(el=>{
        return {...this.state.signupform[el], id:el}
    
    })

    const Inputs=Formlist.map(config=>{
        return <Input 
                key={config.id}
                elementType={config.elementType}
                changed={(e)=>this.inputHandler(e,config.id)}
                elementConfig={config.elementConfig}
                value={config.value}
                isValid={config.isValid}
                label={config.id}/>
})

return Inputs;

}

onswithhandler=(e)=>{
e.preventDefault()
this.setState((prevState)=>{
    return {
        Onswitchlogin:!prevState.Onswitchlogin
    }
})

}
    render(){
        let form=<Spinner/>
        if(this.props.ingreSelected && !this.props.error){
            form=<Redirect to="/checkout"></Redirect>
        }
        
    
        if (!this.props.ingreSelected && !this.props.error){
            form=<Redirect to="/home"></Redirect>
        }
        
        if(!this.props.loading){
            
            form=<form className={styles.Formdata} onSubmit={this.inputhandlerSubmit}>
            {this.props.loggedin && this.state.Onswitchlogin ? 
            < div>
            <h3 className={styles.Message}>succesfully logged in</h3></div> :null}


            {this.props.loggedin && !this.state.Onswitchlogin ? 
            < div>
            <h3 className={styles.Message}>New user created successfully!!</h3></div> :null}

            {!this.props.loggedin && !this.state.error && this.props.userId ? 
            <div>
            <h3 className={styles.Message}>logged out, Please log in again!!</h3></div> :null}

            {this.props.error && this.state.Onswitchlogin  ? <div><h3 className={styles.Message}>{this.props.error}</h3></div> :null}
            
            {this.props.error && !this.state.Onswitchlogin  ?<div><h3 className={styles.Message}>{this.props.error}</h3> </div>:null}

            

            <h2 className={styles.Form_heading}>{ this.state.Onswitchlogin ? "Please login" :"Please Signup for an account"}</h2>
               {this.formArray()}

            <div className={[styles.Form_group, styles.Form_align].join(" ")}>
                <div className={styles.Button}>
                <Button btntype="Success" setDisable={!this.formvalidity()}>{this.state.Onswitchlogin? "LOGIN" :"SUBMIT"}</Button>
                {/* eslint-disable-next-line */}
                 <a className={styles.SWITCH} href="#" onClick={this.onswithhandler}>{this.state.Onswitchlogin ? "Switch to signup": "Switch to login"} <span className={styles.SPANNED}>&rarr;</span></a>
            </div>
        </div>
        </form>
        }
        return form;
    }

}




const mapStatetoProps=(state)=>{
    return{
        loading:state.auth.loading,
        loggedin:state.auth.token,
        error:state.auth.error,
        userId:state.auth.userID,
        ingreSelected:state.build.totalPrice>3,
    }
}
const mapDispatchtoProps=(dispatch)=>{
    return {
        setauth:(data,status)=>dispatch(auth_account(data,status))
    }
}


export default connect(mapStatetoProps,mapDispatchtoProps)(Signup);