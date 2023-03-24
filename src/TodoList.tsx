import * as React from 'react'
import { Box, IconButton, List, ListItem, ListItemText } from '@mui/material'
import { Delete } from '@mui/icons-material'

interface TodoListProps {
  todos: Todo[];
  onDelete(id: Todo['id']): void;
}

export interface Todo {
  id: string;
  text: string;
}

export default function TodoList({todos, onDelete}: TodoListProps) {
  if (!todos.length) {
    return <Box textAlign="center" m={4}>No tasks found</Box>
  }

  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo.id)}>
              <Delete/>
            </IconButton>
          }
        >
          <ListItemText primary={todo.text}/>
        </ListItem>
      ))}
    </List>
  )
}
