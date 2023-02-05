import React, { useState } from 'react'
import './index.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function TodoShowComponent({ todosList, onCheckedInput, onClickDeleteBtn, onSave }) {
    const [tabIndex, setTabIndex] = useState(0);

    function handleCheckBoxInput(event) {
        onCheckedInput(event.target.checked, event.target.id);
    }

    function handleDeleteBtnPress(id) {
        onClickDeleteBtn(id);
    }

    function showFilterTodoList() {

        if (tabIndex === 1) {
            todosList = todosList.filter(obj => obj.is_active === true);
        }
        else if (tabIndex === 2) {
            todosList = todosList.filter(obj => obj.is_active === false);
        }

        return <ul className="todo-list-item" id="todoListItem">
            {
                todosList.map((item) => {
                    return <React.Fragment key={item.id}>
                        <li className='todo-list-item' >
                            <div className='todo-item-box'>
                                <input id={item.id} checked={item.is_active ? false : true} onChange={handleCheckBoxInput} className='check-Box' type="checkbox" />
                                <div className="contentBox">
                                    <p style={{ textDecoration: item.is_active ? "none" : "line-through" }} > {item.title} </p>
                                    <i onClick={() => handleDeleteBtnPress(item.id)} className="far fa-trash-alt delete-icon" ></i>
                                </div>
                            </div>
                        </li>
                    </React.Fragment>
                })
            }
        </ul>
    }


    return (
        <div className="todo-list-container">
            <p className='heading-my-task'>
                <span>My</span> Tasks
            </p>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} >
                <TabList>
                    <Tab>All Todos</Tab>
                    <Tab>Active</Tab>
                    <Tab>Completed</Tab>
                </TabList>
                <TabPanel>
                    {showFilterTodoList()}
                </TabPanel>
                <TabPanel>
                    {showFilterTodoList()}
                </TabPanel>
                <TabPanel>
                    {showFilterTodoList()}
                </TabPanel>
            </Tabs>


            <button onClick={() => onSave()} id="save-button">Save</button>
        </div>
    )
}
