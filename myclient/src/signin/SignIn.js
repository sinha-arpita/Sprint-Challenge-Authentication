import React from "react";
import axios from "axios"

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state={

            username:"",
            password:""
        
        
          }
    }

  
    
      inputHandler=(event)=>{
         this.setState({[event.target.name]:event.target.value})
    
      }
      submitHandler=(event)=>{
        event.preventDefault();
        console.log("Logging in...")
        const endpoint="http://localhost:3300/api/login"
        axios.post(endpoint,this.state)
           .then(res=>{
               console.log("Register response",res)
               localStorage.setItem('jwt',res.data.token)
               this.props.userSignedIn(this.state.username);
           })
           .catch(err=>{
               console.log("thec error is ",err)
           })
      }
    
      render(){
          return(
            <>
             <form className="form" onSubmit={this.submitHandler}>
               <input type="text" placeholder="username" name="username"value={this.state.username}
                onChange={this.inputHandler}/>
    
              <input type="password" placeholder="password" name="password"value={this.state.password}
                onChange={this.inputHandler}/>
             
             
             <button type="submit">SignIn</button>
             
             
             
             </form>
    
    
            </>
    
          )
      }
     

}

export default SignIn
