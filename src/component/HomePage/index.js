import React, { useEffect, useState } from 'react'
import TodoAddComponent from '../TodoAddComponent'
import TodoShowComponent from '../TodoShowComponent'
import { v4 as uuidv4 } from 'uuid';
import './index.css'

import { FallingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {


    const [todosList, setTodoList] = useState([]);
    const [apiFetchResult, setApiFetchResult] = useState(false);

    function handleAddTodoBtnClick(todoText) {
        const todoObject = {
            title: todoText,
            is_active: true,
            id: uuidv4(),
        }
        setTodoList(prevTodoList => [...prevTodoList, todoObject]);;
        toast.success('Todo Added ');
    }

    const fetchIntialTodoList = async () => {
        try {

            const URL = 'https://6325a6b74cd1a2834c41e69e.mockapi.io/todo-list/todos';
            const fetchTodo = await fetch(URL, {
                method: 'GET',
            }).then(response => response.json()).catch(err => console.log("Error while fetcing api"));

            setApiFetchResult(true);

            const todosSavedOnLocalStorage = JSON.parse(localStorage.getItem("usersTodo"));

            // remove duplicate todo if any present insteat of one linter
            // note 1 : instead of one liner we can also use for loop  (for loop method works little bit faster)
            // note 2: instead of filtering our unique date we can also use two state one for user input and one for api call data

            let allTodos=[...fetchTodo]
            if(todosSavedOnLocalStorage){
             allTodos = [ ...todosSavedOnLocalStorage];
            }
            let uniqueTodosArray = [
                ...new Map(allTodos.map((item) => [item["id"], item])).values(),
            ];
            setTodoList([...uniqueTodosArray]);

        }
        catch (err) {
            console.log(err)
        }
    }

    function handleClickOnSaveBtn() {
        localStorage.setItem("usersTodo", JSON.stringify(todosList));
        toast.success('Save Successfully!');
    }

    function handleCheckInputClick(isChecked, id) {
        const todoIndex = todosList.findIndex((obj => obj.id === id));
        todosList[todoIndex].is_active = !isChecked;
        const newTodoList = todosList
        setTodoList([...newTodoList]);
    }

    function handleDeleteBtnClick(id) {
        const newTodoListAfterDelete = todosList.filter(obj => obj.id !== id);
        setTodoList([...newTodoListAfterDelete])
    }

    function showTodoList() {
        if (!apiFetchResult) {
            return <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            />
        }
        else {
            return <TodoShowComponent onSave={handleClickOnSaveBtn} onClickDeleteBtn={handleDeleteBtnClick} onCheckedInput={handleCheckInputClick} todosList={todosList} />
        }
    }


    useEffect(() => {
        if (!apiFetchResult)
            fetchIntialTodoList();
    })
    return (
        <div className="home-page">
            <p className="main-heading">
                Todos
            </p>
            <TodoAddComponent onClick={handleAddTodoBtnClick} />
            {showTodoList()}
        </div>
    )
}
