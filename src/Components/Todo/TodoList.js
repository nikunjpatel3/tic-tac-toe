import { useState } from 'react';
import './TodoList.css';

export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [todoItem, setTodoItem] = useState('');

    function addTodoItem(e) {
        e.preventDefault();
        if (todoItem !== '') {
            let newTodoItem = { name: todoItem, id: todoItem }
            setTodoList([...todoList, newTodoItem]);
            setTodoItem('');
        }
    }

    function deleteTodo(todoItemId) {
        const newTodos = todoList.filter((todoItem) => {
            return todoItem.id !== todoItemId;
        });
        setTodoList(newTodos);
    }

    return (
        <div className="todoapp">
            <form method="post" onSubmit={addTodoItem}>
                <input className="new-todo" placeholder="What needs to be done?" value={todoItem} onChange={e => setTodoItem(e.target.value)} name="todoItem" />
            </form>

            {todoList?.length > 0 ? (
                <ul className="todo-list">
                    {todoList.map(todoItem =>
                        <>
                            <li key={todoItem.id}>{todoItem.name}
                            <button className="destroy" onClick={() => { deleteTodo(todoItem.id); }}></button>
                            </li>
                        </>
                    )}
                </ul>
            ) : (
                <ul className="todo-list no-results">
                    <li>No task found</li>
                </ul>
            )}
        </div>
    )
}