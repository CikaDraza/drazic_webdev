import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getProjects, getProjectById } from './utils/api/projects'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [projects, setProjects] = useState([]);

useEffect(() => {
  const fetchAllProjects = async () => {

    const response = await axios.get('https://pmkzbb1zs8.execute-api.eu-central-1.amazonaws.com/prod/projects');
    console.log(response.data);

  };

  fetchAllProjects();
}, []);
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {
          projects?.map(project => (
            <div key={project.id}>
              <p>{project.id}</p>
              <p>{project.title}</p>
              <p>{project.description}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
