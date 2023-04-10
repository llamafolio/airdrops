import { signal } from '@preact/signals'
import './App.css'

const message = signal('Hi 👋')

export function App() {
  function onClick() {
    fetch(`${import.meta.env.VITE_APP_API_URL}/health`)
      .then((response) => response.text())
      .then((text) => (message.value = text))
  }

  return (
    <div className='App'>
      <div className='card'>
        <button onClick={onClick}>
          Message is "<i>{message}</i>"
        </button>
      </div>
    </div>
  )
}
