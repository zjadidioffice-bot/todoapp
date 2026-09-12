import { useState,useEffect } from "react"


function App()
{
const[todos,setTodos]=useState([]);

useEffect(()=>{
  fetch("http://localhost:3000/api/todos")
  .then((response)=>response.json())
  .then((data)=>{
    setTodos(data);
  });
},[]);

  return(
  <div>
    <h1>TODO APP</h1>
    {todos.map((todo)=>(
      <div key={todo._id}>
        <h3>{todo.title}</h3>
        <p>{todo.completed?"completed":"not completed"}</p>
      </div>
    ))}
  </div>
);

}

export default App;