import path from 'path'
import { readFile } from 'fs/promises'

/**
 * Fetching data from the JSON file and parse to JS data
 * @param {string} pathname
 * @returns {Promise<object>} A promise that contains json parse object
 */
export async function loadJson(pathname) {
  const data = await readFile(path.join(process.cwd(), pathname))
  return JSON.parse(data)
}
