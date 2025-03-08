import { useState } from 'react'
import { Header, Main } from './layouts'
import "./styles/tailwind.css"
import './styles/index.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className='mx-auto w-1/3 mt-2'>
      <Header></Header>
      <Main></Main>
    </section>
  )
}

export default App
