import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({td}) {
  return (
    <ul>
      {td.map(item => <TodoItem key={item.id} {...item} />)}
    </ul>
  )
}