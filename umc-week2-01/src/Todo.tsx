import React, { useState } from 'react';
import './index.css';
import { TTodo } from './types/todo';

export const Todo = () => {
    const [todos, setTodos] = useState<TTodo[]>([
        {id: 1,
         text: '고구마',}
    ])
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([
        {id: 2,
         text: 'ㅇㅇ',
        }
    ])

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todoInput = document.getElementById('todo-input') as HTMLInputElement;
        setTodos((prev) => [...prev, {
            id: Math.random(),
            text: todoInput.value,
        }]);
    }

    const handleComplete = (id: number, text: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
        setDoneTodos((prev)=>[...prev, {
            id: id,
            text: text
        }])
    }
    
    const handleDelete = (id: number) => {
        setDoneTodos(doneTodos.filter(todo => todo.id !== id));
    }

  return (
    <div className="todo-container">
    <h1 className="todo-container__header">TODO LIST🦦🦦</h1>
    <form id="todo-form" className="todo-container__form"  onSubmit={handleAdd}>
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className="todo-container__button">할 일 추가</button>
    </form>
    <div className="render-container">
      <div className="render-container__section">
        <h2 className="render-container__title">할 일</h2>
        <ul id="todo-list" className="render-container__list">
            {todos.map((todo) => (
                <li className='render-container__item'>
                <span className='render-container__item-text'>{todo.text}</span>
                <button className='render-container__item-button' onClick={() => handleComplete(todo.id, todo.text)}>완료</button>
            </li>
            ))}
        </ul>
      </div>
      <div className="render-container__section">
        <h2 className="render-container__title">완료</h2>
        <ul id="done-list" className="render-container__list">
            {doneTodos.map((todo) => (
                <li className='render-container__item'>
                    <span className='render-container__item-text'>{todo.text}</span>
                    <button className='render-container__item-button' onClick={()=>handleDelete(todo.id)}>삭제</button>
                </li>
            ))}

        </ul>
      </div>
    </div>
  </div>
  )
}
