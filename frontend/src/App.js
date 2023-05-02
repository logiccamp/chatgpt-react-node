import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();

    axios.post("http://localhost:5000/get-chat", {prompt})
    .then((res)=>{
      const result = res.data.res;

      setResponse(result.replace(/\n/g, "<br />"));
      // str.replace(/blue/g, "red")
    }).catch((err)=>{
      console.log(err)
    }).finally(()=> setIsLoading(false))
  }
  return (
   <div className='bg-gray-800 min-h-[100vh]'>
      <div className='w-full px-4 max-w-[720px] mx-auto py-24'>
        <div className='w-full justify-center items-center gx-4'>
          <form className='w-full text-center' onSubmit={handleSubmit}>
            <div className='md-5'>
              <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>Just say/ask something!</label>
            </div>

            <div className='py-4'>
              <input className='bg-gray-200 appearance-none border-2 order-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:text-gray-700'
              type={'text'}
              value={prompt}
              onChange={(e)=>setPrompt(e.target.value)}
              />
            </div>

            <div className='text-center'>
              {
                !isLoading ?
              <button className='shadow bg-blue-600 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 w-full px-4 rounded'
              type='submit'
              >Submit</button>
              : <p className="text-gray-200">Please wait...</p>
            }

            </div>
          </form>

          <div className='w-full text-gray-500 items-center mt-6'>
            <div dangerouslySetInnerHTML={{ __html: response}}></div>
          </div>
        </div>
      </div>
   </div>
  );
}

export default App;
