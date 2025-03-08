import { Header, Main } from './layouts'
import "./styles/tailwind.css"
import './styles/index.scss'

function App() {

  return (
    <section className='mx-auto w-1/3 mt-2 p-4'>
      <Header></Header>
      <Main></Main>
    </section>
  )
}

export default App
