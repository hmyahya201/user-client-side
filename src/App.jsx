
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUser] = useState([])

  const formHandler=(event)=>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      const newUser = [...users, data]
      setUser(newUser)
      form.reset()
    })
  }


  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setUser(data)
    })
  },[])
  return (
    <>
     <h2>User Management System</h2>
     <form onSubmit={formHandler} style={{width:"400px", border:"1px solid gray", padding: "20px"}}>
      <div>
      <label htmlFor="name">Name</label>
      <br/>
      <input style={{width:"95%", padding:"4px 10px"}} type="text" name="name" id="name" placeholder="Enter Your Name" />
      </div>

      <div>
      <label htmlFor="email">Email</label>
      <br/>
      <input style={{width:"95%", padding:"4px 10px"}} type="email" name="email" id="email" placeholder="Enter Your Email" />
      </div>
      <input style={{background:"green", padding:"10px 20px", border:"none", color:"white", marginTop:"10px"}} type="submit" value="Submit" />
     </form>
     {
      users?.map(user=><p key = {user.id}>Name:{user.name}, Email:{user.email}</p>)
     }
    </>
  )
}

export default App
