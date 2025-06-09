import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { EditorProvider, ErrorProvider } from './context/ErrorContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorProvider>
      <EditorProvider>
        <App />
      </EditorProvider>
    </ErrorProvider>
  </BrowserRouter>
)
