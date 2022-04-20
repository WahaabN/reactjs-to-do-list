

const Todo = (props) => {
    const todos = props.todos;
    const handleClick = props.handleClick;
    const completedTask = props.completedTask;
    
    return (
        <div>
        {todos.map((todo, index) => (
            <div className="to-do-item" key={todo.id}>
                <div className={todo.completed === "finished" ? "completed-task" : ""}>
                
                {index + 1} &nbsp;
                {todo.task}
                </div>
                <div>
                {todo.date} &nbsp;
                {todo.time}
                </div>
                <div><button onClick={() => completedTask(todo.id, todo.task, todo.date, todo.time)}>Completed</button></div>
                <button onClick={() => {
                    handleClick(todo.id)
                }}><span className="material-icons-outlined">
                delete
                </span></button>
                
            </div>
        ))}
        </div>
      );
}
 
export default Todo;