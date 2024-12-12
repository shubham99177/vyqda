import './App.css'
import AddNote from './components/AddNote '
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <Toaster richColors position="top-right" />
      <AddNote />
    </>
  )
}

export default App
