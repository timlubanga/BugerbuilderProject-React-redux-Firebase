import React, {Component} from'react';
import Button from '../../../components/UI/Button/Button';
import styles from './Contact-data.module.css';
import Spinner from '../../../components/UI/spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import {setpostorder, postorderCancel} from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';



class Contact_data extends Component {

    state={
        formData:{
            Name:{ 
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Name"
                },
                validation:{
                    required:true,
                    minLength:4
                },
                isValid:false,
                value:""
            },
            Email:{
                elementType:"input",
                elementConfig:{
                    type:"email",
                    placeholder:"Email"
                },
                validation:{
                    required:true,
                    minLength:4
                },
                isValid:false,
                value:""
            },
            Street:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Street",
                      
                },
                validation:{
                    required:true,
                    minLength:4
                },
                isValid:false,
                value:""
            },

            PostalCode:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"PostalCode"
                },
                validation:{
                    required:true,
                    minLength:4
                },
                isValid:false,
                value:""
            },
            
            deliveryMethod:{
                elementType:"select",
                elementConfig:{
                    options:[
                        {value:"", displayValue:`Please choose an option below `},
                        {value:"fastest",displayValue:"Fastest"},
                         {value:"cheapest",displayValue:"Cheapest"}]
                },
                validation:{
                    required:true,
                    minLength:5
                },
                isValid:false,
                value:"",
                
            }
        },
        loaded:false,
        formvalidity:false
    }

 
componentWillMount(){
    
    setTimeout(()=>{
        this.setState({loaded:true}); 
        console.log("this mounted")
            
    },1000)
    
}

 handleShow =  ()=>{
   this.props.postorderCancel()
   //this.props.history.push('/');
}
checkFormValidity=()=>{
    const formisValidArray=Object.values(this.state.formData).map(el=>{
        return el.isValid;
    })

    let valid=true;
    for( let value of formisValidArray){
        if (value &&valid){
            valid=true;
        }
        else{
            valid=false
        }
    }

    return valid;

}

controller=new AbortController();
componentWillUnmount(){
    this.controller.abort();
}
contactDataHandler= (event)=>{
event.preventDefault();
    //   const getOrder=await axios.get('/orders.json')
    //   const response=Object.values(getOrder.data);
     const contactData={};
    for (let keys in this.state.formData){
        contactData[keys]=this.state.formData[keys].value;
    }
        
     const data={
         ingredients:this.props.ingre,
         price:this.props.totalPrice,
         contactInform:contactData
         
        };

        this.props.postorder(data);

    // if (!this.checkFormValidity()){
    //     alert("Please fill all the fields correctly");
    //     return;
    // }

    //  axios.post('/orders.json',data,{signal:this.controller.signal})
    //  .then((response)=>{
    //      console.log(response.data.name);
         
    //      setTimeout(()=>{
    //         this.setState({show:true, error:false,loading:false});
    //      },5000)
         
         
         
    //  })
    //  .catch(()=>{
    //      this.setState({show:true,error:true, loading:false});
         
    //  })
}



checkValidity=(value, rules)=>{
    let isValid=true;
    if(rules.required){
        isValid=value.trim()!==""&&isValid
    }
    if(rules.required){
        isValid=value.length>=rules.minLength && isValid
    }

    return isValid;

}
onchangeHandler=async (event,identifier)=>{
  const updatedForm={...this.state.formData};
  const updatedRecord={...updatedForm[identifier]};
  updatedRecord.value=event.target.value;
  const results=this.checkValidity(updatedRecord.value,updatedRecord.validation);
  updatedRecord.isValid=results;
  updatedForm[identifier]=updatedRecord;
   await this.setState({formData:updatedForm});
   const overalvalidity=this.checkFormValidity();
   this.setState({formvalidity:overalvalidity})


}
render(){

    console.log("this loaded")
    const formDataArray=[];
    for (let keys in this.state.formData){
        formDataArray.push({config:this.state.formData[keys], id:keys})
    }
    
    let display=<Spinner/>
    
    if (this.state.loaded){
        display=(<div className={styles.Formdata}>
        <form onSubmit={this.contactDataHandler}>
        <h2 className={styles.Form_heading}>Please Fill out the Contact Form</h2>
        {formDataArray.map(el=>{
            return  <Input key={el.id} 
            Invalid={!el.config.isValid}
            elementType={el.config.elementType} 
            elementConfig={el.config.elementConfig} 
            value={el.config.value} label={el.id} 
            changed={(event)=>this.onchangeHandler(event,el.id)}/>
        })}
       
        {/* <Input input_type="input" type="email" name="email" placeholder="Email" id="email1" label="Email" required autoComplete="off"/>
        <Input input_type="input"type="text" name="street" placeholder="Street" id="street1" label="Street" required autoComplete="off"/>
        <Input input_type="input"type="text" name="postcode" placeholder="PostalCode" id="post1" label="PostalCode" required autoComplete="off"/> */}
             
            <div className={[styles.Form_group, styles.Form_align].join(" ")}>
                <div className={styles.Button}>
            <Button btntype="Success" setDisable={!this.state.formvalidity}>ORDER</Button>
                </div>
            </div>
    </form>
    </div>)

    }
    let post=null;
    if(this.props.loading){
        post=<Spinner/>
    }
    if(this.props.error){
        post=<p>Something went terribly wrong</p>
    }

    else if(!this.props.error && !this.props.loading){
        
    post=<p>The information has been saved successfully</p>
        
      
    }

    return (
        <div>
        <div className={styles.Container}> 
                {display}
        <Modal show={this.props.show} handleShow={this.handleShow}>
            {post}
        </Modal>
        </div>
            {this.props.success ?<Redirect to ="/home"/>:null}
        </div>
    );
}
};


const mapStatetoProps=(state)=>{
    return {
        ingre:state.build.ingredients,
        totalPrice:state.build.totalPrice,
        loading:state.order.loading,
        show:state.order.show,
        error:state.order.error,
        success:state.order.success
    }
}

const mapDispatchtoProps=(dispatch)=>{
    return{
        postorder:(data)=>dispatch(setpostorder(data)),
        postorderCancel:()=>dispatch(postorderCancel()),
        
    }

}

export default connect(mapStatetoProps, mapDispatchtoProps)(Contact_data);