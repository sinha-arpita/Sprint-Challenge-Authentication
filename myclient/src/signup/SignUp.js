import React from "react"
import axios from "axios";

class SignUp extends React.Component{
  state={

    username:"",
    password:""


  }

  inputHandler=(event)=>{
     this.setState({[event.target.name]:event.target.value})

  }
  submitHandler=(event)=>{

    const endpoint="http://localhost:3300/api/register"
    axios.post(endpoint,this.state)
       .then(res=>{
           console.log("Register response",res)
           localStorage.setItem('jwt',res.data.token)
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
         
         
         <button type="submit">SignUp</button>
         
         
         
         </form>


        </>

      )
  }
 
}

export default SignUp


