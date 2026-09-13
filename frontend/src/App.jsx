import { useState,useEffect } from "react"


function App()
{
const[todos,setTodos]=useState([]);
const [title,setTitle]=useState("");
const [editingId,setEditingId]=useState(null);
const [editingTitle,setEditingTitle]=useState("");
useEffect(()=>{
  fetch("http://localhost:3000/api/todos")
  .then((response)=>response.json())
  .then((data)=>{
    setTodos(data);
  });
},[]);

const handleUpdate=(id)=>{
  fetch(`http://localhost:3000/api/todos/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      title:editingTitle,
    }),
  })
  .then((response)=>response.json())
  .then((updateTodo)=>{
    setTodos(
        todos.map((item)=>
        item._id===id?updateTodo:item)
      
    );
    setEditingId(null);
    setEditingTitle("");
  });
};

const handleSubmit=(event)=>{
  event.preventDefault();

  fetch("http://localhost:3000/api/todos",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      title:title,
    }),
  })
  .then((response)=>response.json())
  .then((newTodo)=>{
    setTodos([...todos,newTodo]);
    setTitle("");
  });
};

const handleDelete=(id)=>{
  fetch(`http://localhost:3000/api/todos/${id}`,{
    method:"DELETE",
  })
  .then((response)=>response.json())
  .then(()=>{
    setTodos(todos.filter((todo)=>todo._id !==id))
  });
};

  return(
  <div>
    <h1>TODO APP</h1>

    <form onSubmit={handleSubmit}>
      <input
      type="text"
      value={title}
      onChange={(event)=>setTitle(event.target.value)}
      placeholder="enter todo..."
      />
      <button type="submit">add todo</button>
    </form>


    {todos.map((todo) => (
  <div key={todo._id}>
    {editingId === todo._id ? (
      <>
        <input
          type="text"
          value={editingTitle}
          onChange={(event) => setEditingTitle(event.target.value)}
        />

        <button onClick={() => handleUpdate(todo._id)}>
          Save
        </button>

        <button
          onClick={() => {
            setEditingId(null);
            setEditingTitle("");
          }}
        >
          Cancel
        </button>
      </>
    ) : (
      <>
        <h3>{todo.title}</h3>

        <p>
          {todo.completed ? "Completed" : "Not completed"}
        </p>

        <button onClick={() => handleDelete(todo._id)}>
          Delete
        </button>

        <button
          onClick={() => {
            setEditingId(todo._id);
            setEditingTitle(todo.title);
          }}
        >
          Edit
        </button>
      </>
    )}
  </div>
))}
  </div>
);

}

export default App;