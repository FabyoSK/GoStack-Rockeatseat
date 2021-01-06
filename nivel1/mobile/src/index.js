import React,{useEffect, useState} from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet,StatusBar, TouchableOpacity } from 'react-native'
import api from './services/api'

export default function App (){
  const [projects, setProjects] = useState([])

  useEffect(() => {{
    api.get('projects').then(response => {
      setProjects(response.data)})
  }}, [])

  async function handleAddProject(){
    const response = await api.post('projects', {
      title: 'Novo Projeto',
      owner: 'FSK'
    })
    setProjects([...projects,response.data])
  }
  
  return (
    <>
      <StatusBar barStyle='light-content'/>
      <SafeAreaView style={styles.container}>
      <FlatList 
      data={projects}
      keyExtractor={project => project.id}
      renderItem={({ item: project}) => (
        <Text style={styles.title} key={project.id}>{project.title}</Text>
      )}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProject}>
        <Text styles={styles.buttonText}>Adicionar projeto</Text>
      </TouchableOpacity>
      </SafeAreaView>
  </>
  )}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  title:{
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button:{
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
})