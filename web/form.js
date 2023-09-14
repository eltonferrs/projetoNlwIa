import { server } from "./server.js"
const form = document.querySelector('#form')
const input = document.querySelector('#url')
const content = document.querySelector("#content")
form.addEventListener('submit',async (event)=>{
  event.preventDefault()
  content.classList.add("placeholder")
  
  const videoURL = input.value
  if(!videoURL.includes('shorts')){
    return content.textContent='Não é um vídeo shorts'
  }

  const params =videoURL.split('/shorts')
  const [idvideo]= params[1].split('?si')
  content.textContent = "Carregando..."
 
  const transcription = await server.get('/summary'+ idvideo)
  content.textContent = "Realizando o resumo..."
 
  const summary = await server.post('/summary',{
    text: transcription.data.result
  })

  content.classList.remove('placeholder')
  content.textContent = summary.data.result

})