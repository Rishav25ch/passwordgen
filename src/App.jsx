import { useCallback, useEffect, useState,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //ref hook
  const passwordref=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed]) // dependency

  const copyPasswordtoClipboard=useCallback(()=> {
    passwordref.current?.select(); //select kar ke dekha dega
    passwordref.current?.setSelectionRange(0,20)
   window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]) // agr ismeh kuch v cher char ho phir seh run kardo

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-800'>
        <h1 className='text-white text-center my-3 text-2xl font-semibold'>Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-gray-700 text-white'
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button
          onClick={copyPasswordtoClipboard}
            className='outline-none bg-blue-700 active:bg-green-600 transition-colors duration-300 text-white px-3 py-0.5 shrink-0 '
            
          >
            Copy
          </button>
        </div>
         <div className="flex flex-col gap-4 text-sm text-white">
    <div className="flex items-center justify-between">
      <label>Password Length: {length}</label>
      <input
        type="range"
        min="4"
        max="20"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        className="w-1/2"
      />
    </div>

    <div className="flex items-center justify-between">
      <label className="text-green-500">Numbers </label>

      <input
        type="checkbox"
        checked={numberAllowed}
        onChange={() => setAllowed((prev) => !prev)}
      />
    </div>

    <div className="flex items-center justify-between ">
     <label className="text-red-500"> Special Characters</label>
      <input
        type="checkbox"
        checked={charAllowed}
        onChange={() => setCharAllowed((prev) => !prev)}
      />
    </div>
  </div>

</div>
  

        
  
      
    </>
  )
}

export default App
