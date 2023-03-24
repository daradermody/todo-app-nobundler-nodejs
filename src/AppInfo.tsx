import * as React from 'react'
import { Alert, AlertTitle } from '@mui/material'

interface AppInfoProps {
  fetchCount: number;
  loadTime: number;
}

export function AppInfo({fetchCount, loadTime}: AppInfoProps) {
  const roundedLoadTime = Math.round(loadTime * 100) / 100
  return (
    <Alert severity="info" icon={false} sx={{ mt: 8 }}>
      <AlertTitle><b>{fetchCount} JS files</b> fetched in <b>{roundedLoadTime} seconds</b> to render this app</AlertTitle>
      Boy, that was slow to load! That's because this simple todo app is built without a bundler. It uses{' '}
      <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules">JavaScript modules</a>{' '}
      to individually import all sources files <i>and</i> third-party libraries on demand. For each JS file fetched and parsed, the browser{' '}
      fetches other modules it depends on, and so on, which means a cascade of requests (check out the Network tab in your dev tools!). See{' '}
      <a target="_blank" href="https://github.com/daradermody/todo-app-nobundler-nodejs">here</a> for more info.
    </Alert>
  )
}
