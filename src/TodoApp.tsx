import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CircularProgress, Container, Typography } from '@mui/material'
import TodoInput from './TodoInput.js'
import TodoList, { Todo } from './TodoList.js'
import { useLocalStorageState } from './useLocalStorageState.js'
import { AppInfo } from './AppInfo.js'

interface AppProps {
  fetchCount: number;
  loadTime: number;
}

export default function App({fetchCount, loadTime}: AppProps) {
  const [todos, setTodos] = useLocalStorageState<Todo[]>('todoItems')

  function addTodo(todoText: string) {
    setTodos([
      ...todos!,
      {id: uuidv4(), text: todoText}
    ])
  }

  function deleteTodo(id: Todo['id']) {
    setTodos(todos => todos!.filter(todo => todo.id !== id))
  }

  if (todos === undefined) {
    return <CircularProgress/>
  }

  return (
    <Container fixed maxWidth="sm">
      <Typography variant="h3" sx={{mt: 2, mb: 2, textAlign: 'center'}}>Unbundled Todo App</Typography>
      <TodoList todos={todos} onDelete={deleteTodo}/>
      <TodoInput addTodo={addTodo}/>
      <AppInfo fetchCount={fetchCount} loadTime={loadTime}/>
    </Container>
  )
}

