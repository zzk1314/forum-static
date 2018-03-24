import { ppost } from '../../../utils/request'

export function insertRichText (title, content) {
  return ppost(`/pc/upload/richText`, { title: title, content: content })
}

export function uploadFile (file) {
  return ppost(`/pc/upload/file`, file)
}
