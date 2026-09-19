import { useState, useEffect } from "react"
import "./App.css"
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [showRegister,setShowRegister]=useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTodos(data);
        }
      });
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    setTodos([]);
  };

  const handleToggle = (todo) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/todos/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed,
      }),
    })
      .then((response) => response.json())
      .then((updateTodo) => {
        setTodos(
          todos.map((item) =>
            item._id === todo._id ? updateTodo : item)
        );
      });
  };

  const handleUpdate = (todo) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/todos/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify({
        title: editingTitle,
        completed: todo.completed,
      }),
    })
      .then((response) => response.json())
      .then((updateTodo) => {
        setTodos(
          todos.map((item) =>
            item._id === todo._id ? updateTodo : item)

        );
        setEditingId(null);
        setEditingTitle("");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setTitle("");
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id))
      });
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <>
        {showRegister?(
          <>
          <Register/>
          <button onClick={()=>setShowRegister(false)}>go to login</button>
          </>
        ):(
          <>
          <Login
          onLogin={()=>{
            setIsLoggedIn(true);
            setUser(JSON.parse(localStorage.getItem("user")));
          }}
          />
          <button onClick={()=>setShowRegister(true)}>go to register</button>
          </>
        )

        }
        </>
      ) : (
        <>
          <h1>TODO APP</h1>

          <p>welcome {user?.name}</p>
          <button onClick={handleLogout}>logout</button>
          <form className="todo-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="enter todo..."
            />
            <button type="submit">add todo</button>
          </form>

          {todos.map((todo) => (
            <div className="todo" key={todo._id}>
              {editingId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(event) => setEditingTitle(event.target.value)}
                  />
                  <button className="save-button"
                    onClick={() => handleUpdate(todo)}>
                    Save
                  </button>

                  <button className="cancel-button"
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
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                  />
                  <h3 className="todo-title">{todo.title}</h3>
                  <p>
                    {todo.completed ? "Completed" : "Not completed"}
                  </p>

                  <button className="delete-button"
                    onClick={() => handleDelete(todo._id)}>
                    Delete
                  </button>

                  <button className="edit-button"
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
        </>
      )}
    </div>

  );

}






export default App;