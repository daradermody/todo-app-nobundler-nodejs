import { useState, useEffect } from 'react'

export function useLocalStorageState<T>(storageKey: string): UseStateReturn<T> {
  const [data, setData] = useState() as UseStateReturn<T>

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem(storageKey) || '[]'))
  }, [setData])

  useEffect(() => {
    if (data) {
      localStorage.setItem(storageKey, JSON.stringify(data))
    }
  }, [data])

  return [data, setData]
}

type UseStateReturn<T> = [T, Dispatch<SetStateAction<T | undefined>>]

type SetStateAction<S> = S | ((prevState: S) => S)

type Dispatch<A> = (value: A) => void;
