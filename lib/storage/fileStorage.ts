import { promises as fs } from 'fs'
import path from 'path'

function getDataPath() {
  const envPath = process.env.DATA_FILE_PATH || './data/document-types.json'
  return path.isAbsolute(envPath) ? envPath : path.join(process.cwd(), envPath)
}

async function ensureDirExists(filePath: string) {
  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
}

export async function readData<T>(filename?: string): Promise<T> {
  const filePath = filename ? filename : getDataPath()
  await ensureDirExists(filePath)
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content) as T
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      const init = { document_types: [] }
      await fs.writeFile(filePath, JSON.stringify(init, null, 2), 'utf-8')
      return init as T
    }
    throw err
  }
}

export async function writeData<T>(data: T, filename?: string): Promise<void> {
  const filePath = filename ? filename : getDataPath()
  await ensureDirExists(filePath)
  const tmp = filePath + '.tmp'
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf-8')
  await fs.rename(tmp, filePath)
}
