import React, { useState } from 'react'
import './index.css'

export default function TodoAddComponent(props) {

    const [todoInputValue, setTodoInputValue] = useState('');

    function sendTodoDetail() {
        props.onClick(todoInputValue);
        setTodoInputValue('')
    }

    function todoInputChange(event) {
        setTodoInputValue(event.target.value);
    }

    function onInputKeyPress(event){
        if(event.key==='Enter' && event.target.value!==''){
            sendTodoDetail();
        }
    }

    return (
        <div className="todo-add-container">
            <p className='heading-create-task'>
                <span>Create</span> Task
            </p>
            <input onKeyPress={onInputKeyPress} onChange={todoInputChange} value={todoInputValue} type="text" className="todo-input" placeholder='What needs to be done..?' />
            <button onClick={sendTodoDetail} className='todo-add-btn'
                disabled={todoInputValue === '' ? true : false} >
                Add
            </button>
        </div>
    )
}
