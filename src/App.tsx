'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type SortingAlgorithm = 'bubble' | 'selection' | 'insertion' | 'quick'

export default function App() {
  const [array, setArray] = useState<number[]>([])
  const [sorting, setSorting] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble')
  const [speed, setSpeed] = useState(50)

  useEffect(() => {
    resetArray()
  }, [])

  const resetArray = () => {
    const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setCompleted(false)
  }

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const bubbleSort = async () => {
    let arr = [...array]
    const n = arr.length
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          await sleep(speed)
        }
      }
    }
  }

  const selectionSort = async () => {
    let arr = [...array]
    const n = arr.length
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        setArray([...arr])
        await sleep(speed)
      }
    }
  }

  const insertionSort = async () => {
    let arr = [...array]
    const n = arr.length
    for (let i = 1; i < n; i++) {
      let key = arr[i]
      let j = i - 1
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j]
        j = j - 1
        setArray([...arr])
        await sleep(speed)
      }
      arr[j + 1] = key
      setArray([...arr])
      await sleep(speed)
    }
  }

  const quickSort = async () => {
    const partition = async (arr: number[], low: number, high: number) => {
      const pivot = arr[high]
      let i = low - 1
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++
          [arr[i], arr[j]] = [arr[j], arr[i]]
          setArray([...arr])
          await sleep(speed)
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      setArray([...arr])
      await sleep(speed)
      return i + 1
    }

    const quickSortHelper = async (arr: number[], low: number, high: number) => {
      if (low < high) {
        const pi = await partition(arr, low, high)
        await quickSortHelper(arr, low, pi - 1)
        await quickSortHelper(arr, pi + 1, high)
      }
    }

    let arr = [...array]
    await quickSortHelper(arr, 0, arr.length - 1)
  }

  const startSorting = async () => {
    setSorting(true)
    switch (algorithm) {
      case 'bubble':
        await bubbleSort()
        break
      case 'selection':
        await selectionSort()
        break
      case 'insertion':
        await insertionSort()
        break
      case 'quick':
        await quickSort()
        break
    }
    setSorting(false)
    setCompleted(true)
  }

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      
      <h1 className="text-4xl font-bold mb-8 text-white">Sorting Algorithm Visualizer</h1>
      <div className="flex items-end justify-center h-64 mb-8 border-b border-gray-600 w-full">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className="w-2 mx-px bg-blue-500 rounded-t-sm"
            style={{
              height: `${value}%`,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.01 }}
          ></motion.div>
        ))}
      </div>
      <div className="space-y-4 w-full max-w-md">
        <div className="flex justify-between">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as SortingAlgorithm)}
            disabled={sorting}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
          <button
            onClick={resetArray}
            disabled={sorting}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          >
            Reset Array
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="speed" className="text-white mr-4">
            Speed:
          </label>
          <input
            type="range"
            id="speed"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(101 - parseInt(e.target.value))}
            disabled={sorting}
            className="w-full"
          />
        </div>
        <button
          onClick={startSorting}
          disabled={sorting || completed}
          className="w-full px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300 disabled:opacity-50"
        >
          {sorting ? 'Sorting...' : completed ? 'Sorted!' : 'Start Sorting'}
        </button>
       

      </div>
      <h1>By Manish Yadav</h1>
    </div>
  )
}
