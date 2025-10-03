import fs from 'node:fs'
import path from 'node:path'

function getJsonFile(filePath: string) {
  const json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
  return JSON.parse(json)
}

export {
  getJsonFile,
}
