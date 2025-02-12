import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import "./index.css"
import "./fonts/styles.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
