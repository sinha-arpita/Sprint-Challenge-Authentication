import React from "react"
import axios from "axios";



class Jokes extends React.Component{
   state={
    jokes:[]

   }

   render(){
      return(
       <div>
           {
              this.state.jokes.map(joke =>{
               return  <div> {joke.joke} </div>
               })
           }
       </div>

      )

   }
   componentDidMount(){
     const headers={authorization:localStorage.getItem('jwt')}
     
      const endpoint="http://localhost:3300/api/jokes"
      axios.get(endpoint,{headers})
           .then(res=>{
               console.log("JOKES RESPONSE",res)
               this.setState({jokes:res.data})
           })

           .catch(error=>{
               console.log("error:",error)
               this.setState({jokes:[{id : 1, joke : "You are not authorized to read jokes!! Please sign in.."}]})
           })
   }


}
export  default Jokes