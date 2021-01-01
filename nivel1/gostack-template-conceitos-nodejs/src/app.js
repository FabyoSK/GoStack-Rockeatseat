const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require("uuidv4")
// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)  
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body
  const repo = {id:uuid(), title, url, techs, likes:0}
  repositories.push(repo)
  return response.json(repo)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const {title, url, techs} = request.body

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex === -1){
    return response.status(400).json({error: "repo not exist"})
  }
  const repo = {
    id, title, url, techs, likes : repositories[repoIndex].likes
  }
  repositories[repoIndex] = repo
  return response.json(repo)
});

app.delete("/repositories/:id", (request, response) => {
  const {id } = request.params
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex >= 0) {
    repositories.splice(repoIndex, 1)
  } else {
    return response.status(400).json({ERROR: "error"})
  }
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id } = request.params
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex >= 0) { 
     repositories[repoIndex].likes++
  } else {
    return response.status(400).json({ERROR: "error"})
  }

  return response.json(repositories[repoIndex])
});

module.exports = app;
