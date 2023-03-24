import { createRoot } from 'react-dom'
import * as React from 'react'
import TodoApp from './TodoApp.js'

export function setupApp(fetchCount: number, loadTime: number) {
  createRoot(document.getElementById('app'))
    .render(<TodoApp fetchCount={fetchCount} loadTime={loadTime}/>)
}
