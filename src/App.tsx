import { Header } from "./components/Header"
import { Game } from "./components/Game"


function App() {

  return (
    <>
    <div className="h-full flex flex-col">
      <Header />
      <Game solution="REACT"/>
    </div>
    </>
  )
}

export default App
