import { pget, ppost } from '../../../../utils/request'


export function uploadAudioFile(file, prefix) {
  return ppost(`/pc/upload/audio/ftp?prefix=${prefix}`, file)
}

export function updateAudioDB(name, ftpFileName, words, audioId) {
  return ppost(`/pc/upload/audio/db`, {
    name: name,
    ftpFileName: ftpFileName,
    words: words
  })
}

export function loadAudio(id){
  return pget(`/pc/upload/audio/load/${id}`)
}
