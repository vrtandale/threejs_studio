import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CanvasProvider } from './threejs/canvas-utils/canvas-provider.tsx'
import { DialogProvider } from './providers/DialogProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CanvasProvider>
      <DialogProvider>
        <App />
      </DialogProvider>
    </CanvasProvider>
  </StrictMode>,
)
