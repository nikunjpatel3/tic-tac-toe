import { useState, Fragment } from 'react';
import './TodoList.css';

export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [todoItem, setTodoItem] = useState('');
    const [toggleAll, setToggleAll] = useState(false);


    function uuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function addTodoItem(e) {
        e.preventDefault();
        if (todoItem !== '') {
            let newTodoItem = { name: todoItem, id: uuid(), isChecked: false }
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

    function updateCheckStatus(todoItem) {
        setTodoList(
            todoList.map((item) =>
                item.id === todoItem.id
                    ? { ...item, isChecked: !item.isChecked }
                    : item
            )
        )
    }

    function onToggleAll() {
        setToggleAll(!toggleAll);
        debugger;
        if (toggleAll) {
            setTodoList(todoList.map(todoItem => ({ ...todoItem, isChecked: true })))
        } else {
            setTodoList(todoList.map(todoItem => ({ ...todoItem, isChecked: false })))
        }
    }

    function leftTodoItems() {
        let itemsLeft = todoList.filter(x => !x.isChecked).length;
        return itemsLeft > 1 ? itemsLeft + ' items left' : itemsLeft + ' item left';
    }

    function clearCompleted() {
        console.log('Called')
        const newTodos = todoList.filter((todoItem) => {
            return todoItem.isChecked === false;
        });
        setTodoList(newTodos);
    }

    function filter(){
        
    }

    return (
        <div className="todoapp">

            <form method="post" onSubmit={addTodoItem}>
                <input className="new-todo" placeholder="What needs to be done?" value={todoItem} onChange={e => setTodoItem(e.target.value)} name="todoItem" />
            </form>

            {todoList?.length > 0 ? (
                <>
                    <input id="toggle-all" className="toggle-all" type='checkbox' checked={toggleAll} onChange={() => onToggleAll()}></input>
                    <label htmlFor="toggle-all"></label>

                    <ul className="todo-list">
                        {todoList.map(todoItem =>
                            <Fragment key={todoItem.id}>
                                <li key={todoItem.id} className={todoItem.isChecked ? 'completed' : ''}>
                                    <input className="toggle" type="checkbox" id={`checkbox-{todoItem.id}`} checked={todoItem.isChecked} onChange={() => updateCheckStatus(todoItem)} />
                                    <label>{todoItem.name}</label>
                                    <button className="destroy" onClick={() => { deleteTodo(todoItem.id); }}></button>
                                </li>
                            </Fragment>
                        )}
                    </ul>

                    <footer className='footer'>
                        <span className='todo-count'>
                            <strong>{leftTodoItems()}</strong>
                        </span>
                        <ul className="filters">
                            <li>
                                <a href="#/" className={todoItem.isChecked ? 'selected' : ''}>All</a>
                            </li>
                            <li>
                                <a href="#/active">Active</a>
                            </li>
                            <li>
                                <a href="#/completed">Completed</a>
                            </li>
                        </ul>
                        <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
                    </footer>
                </>
            ) : (
                <ul className="todo-list no-results">
                    <li key="0">No task found</li>
                </ul>
            )}

        </div>
    )
}