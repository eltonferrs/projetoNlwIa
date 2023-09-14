import ytdl from "ytdl-core"
import fs from "fs"

export const download = (idVideo) => new Promise((resolve, reject) => {
  const urlvideo = 'https://www.youtube.com/shorts/'+ idVideo
  
  ytdl(urlvideo,{quality:'lowestaudio',filter:'audioonly'})
  .on('info',(info)=>{
    const seconds = info.formats[0].approxDurationMs / 1000
    if(seconds> 60){
      throw new Error(" O vídeo tem mais que 60 segundos.")
    }
  }).on('end',()=>{
    console.log("Download realizado com sucesso")
    resolve()
  }).on('error',(error)=>{
    console.log('Não foi possivel fazer download, deu error:',error)
    reject(error)
  }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})