import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import ToDoList from './components/TodoList';
import Navbar from './components/Navbar';


function App() {

  const [todos, setTodDos] = useState([]);

  const [mainTask, setMainTask] = useState("Test")

  const handleClick = (id) => {
      

      let newTodos = todos.filter(todo => todo.id != id);

      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
        
      }


      fetch("http://localhost:8000/tasks/" + id, options)
    .then(data => {
      if (!data.ok){
        throw Error(data.status);
      }
      return data.json();
    }).then(update => {
      console.log(update);
    });






      setTodDos(newTodos);
        
  
  
  
  
  
  
    }

    const fetchData = () => {
       fetch("http://localhost:8000/tasks/").then(res => {
      return res.json()
    }).then (data => {
        console.log(data);
        setTodDos(data);
    })
    }

  const addTask = (task) => {
    const date = new Date();
    const listLength = todos.length; 
    const isCompleted = "unfinished"
    let newData = {id: Math.floor(Math.random(listLength)* 1000000), 
      task: task, 
      date: date.getDate() + "/" + (1 + date.getMonth()), 
      time: date.getHours() + ":" + ('0'+date.getMinutes()).slice(-2),
      completed: "unfinished"};
       
    let newTodos = todos.slice();
    newTodos.push(newData);
    console.log(newTodos);
    console.log(todos);
   setTodDos(newTodos);
   

   const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(newData)
     
   }

   console.log(JSON.stringify(newData));

   fetch("http://localhost:8000/tasks/", options)
    .then(data => {
      if (!data.ok){
        throw Error(data.status);
      }
      return data.json();
    }).then(update => {
      console.log(update);
    });
  }


  useEffect(() => {
    fetch("http://localhost:8000/tasks/").then(res => {
      return res.json()
    }).then (data => {
        console.log(data);
        setTodDos(data);
    })
  }, []);

  const completedTask = (id, task, date, time) => {

     

      let updatedData = {
        id: id,
        task: task,
        date: date,
        time: time,
        completed: "finished"
      }
      const options = {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(updatedData)
     
   }

   fetch("http://localhost:8000/tasks/"+id, options)
    .then(data => {
      if (!data.ok){
        throw Error(data.status);
        
      }
      return data.json();
    }).then(update => {
      console.log(update);
      fetchData();
    });

  

    
    
   

    



  }

  
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet" />
      <Navbar />
      <div className='body-content'>
          <ToDoList todos = {todos} handleClick = {handleClick} completedTask = {completedTask} />
          <h1>{mainTask}</h1><br/> 
        

          <input id = "task-to-add"></input><br/>
          <button id onClick={() => {
            addTask(document.getElementById("task-to-add").value);
  }}>Add task</button>
      </div>
    </div>
  );
}

export default App;
