import { useEffect, useState } from 'react';
import TaskList from '@/components/TaskList'
import styles from './Home.module.css'

export default function Home() {
  const [taskTexts, setTaskTexts] = useState([]);

  useEffect(() => setTaskTexts(Array(10).fill(null).map((_, i) => i)), [setTaskTexts])

  return (
    <>
      <TaskList taskTexts={taskTexts} setTaskTexts={setTaskTexts} />
    </>
  )
}