import { BrowserRouter } from 'react-router-dom'
import Routes from './navigation/Routes'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

export default App
