import React, {useState, useEffect} from 'react';

import api from './services/api';

import './App.css';

import Header from './components/Header';


function App() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    api.get('projects').then(response =>{
        setProjects(response.data)
    })
  }, [])
  async function handleAddProject() {
    // setProjects([...projects, 'jjj'])

    const response = await api.post('projects', {
      title: "Some thing",
      owner: "FSK"
    })
    const project = response.data
    setProjects([...projects, project])
  }
  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>nnn</button>
    </>
  );
}

export default App;