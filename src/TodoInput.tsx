import * as React from 'react'
import { useCallback, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'

interface TodoInputProps {
  addTodo(text: string): void
}

export default function TodoInput({addTodo}: TodoInputProps) {
  const [input, setInput] = useState('')

  const handleAddTodo = useCallback(() => {
    if (input) {
      addTodo(input)
      setInput('')
    }
  }, [addTodo, input])

  return (
    <Box display="flex" alignItems="stretch" sx={{gap: 1}}>
      <TextField
        placeholder="Add todo item"
        fullWidth
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleAddTodo()}
      />
      <Button aria-label="add" size="large" color="primary" onClick={handleAddTodo} variant="contained" disabled={!input}>
        <Add/>
      </Button>
    </Box>
  )
}
