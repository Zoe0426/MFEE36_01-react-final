import { kebabCase } from 'lodash'

// detect if has CJK chars
export const hasCJK = (str) => {
  let regExp =
    /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g

  let found = false

  for (let i = 0; i < str.length; i++) {
    if (regExp.test(str[i])) {
      found = true
      break
    }
  }

  return found
}

// test if has CJK word and decide to kebabize or punycode encode
export const toURL = (str) =>
  hasCJK(str) ? encodeURIComponent(str) : kebabCase(str)

// only for test for Percent encoding decode back
export const toText = (url) => decodeURIComponent(url)
