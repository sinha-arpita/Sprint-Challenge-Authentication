const db= require('../dbConfig.js')
module.exports={
    add,
    find,
    findBy,
    
    
  };
  
 function find(){
     return db('users')
 }

 function findBy(filter){

    return db('users').where(filter)
 }

  async function add(user){
      const [id]=await db('users').insert(user)
      return findBy({id})
      .first();

  } 

