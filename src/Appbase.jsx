import reactLogo from './assets/react.svg'
import viteLogo from "./assets/vite.svg"
import './App.css'
import AIToolsNavigation from './components/AiToolsNavigation';
import backgrounds from './data/backgrounds'
import { useState, useEffect } from 'react';

function App() {
  const [bgUrl, setBgUrl] = useState("")
  const [count, setCount] = useState(0)

  const changeBackground = () => {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)]
    setBgUrl(randomBg)
  }

  useEffect(() => {
    changeBackground()
  }, []);


  return (
    <>
      
      <div>
        {/* {<a href="https://vite.dev" target="_blank" location="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>} */}
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      {/* <h1>Hello, TailwindCSS!</h1> */}
      
      <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
      

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-center mb-6">
          <button
            className="bg-white text-sm px-4 py-2 rounded shadow hover:bg-gray-100 transition"
            onClick={changeBackground}
          >
            更换背景
          </button>
        </div>
      <AIToolsNavigation />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </div>
    </>
  )
}

export default App
