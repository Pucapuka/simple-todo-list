import './App.css'
import Header from './components/Header/Header.tsx'
import Todo from './components/Todo/Todo.tsx'

function App() {

  return (
    <>
      <div className="container">
        <Header/>
        <Todo/>
      </div>
    </>
  )
}

export default App
