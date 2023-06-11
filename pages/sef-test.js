import { toURL, toText, hasCJK } from '@/utils/sef'

export default function SefTest() {
  const t1 = 'NIKE手機商品'
  const t2 = "NIKE Men's shoe"
  const t3 = '手機配件 是 Good'
  const t4 = '今天開始從台東環島'

  return (
    <>
      SEF Test
      <p>t1:{t1}</p>
      <p>hasCJK: {hasCJK(t1) ? 'true' : 'false'}</p>
      <p>t1-toURL: {toURL(t1)}</p>
      <p>t1-toURL-toText :{hasCJK(t1) ? toText(toURL(t1)) : 'no use'}</p>
      <hr />
      <p>t2:{t2}</p>
      <p>hasCJK: {hasCJK(t2) ? 'true' : 'false'}</p>
      <p>t2-toURL: {toURL(t2)}</p>
      <p>t2-toURL-toText : {hasCJK(t2) ? toText(toURL(t2)) : 'no use'}</p>
      <hr />
      <p>t3:{t3}</p>
      <p>hasCJK: {hasCJK(t3) ? 'true' : 'false'}</p>
      <p>t3-toURL: {toURL(t3)}</p>
      <p>t3-toURL-toText : {hasCJK(t3) ? toText(toURL(t3)) : 'no use'}</p>
      <hr />
      <p>t4:{t4}</p>
      <p>hasCJK: {hasCJK(t4) ? 'true' : 'false'}</p>
      <p>t4-toURL: {toURL(t4)}</p>
      <p>t4-toURL-toText : {hasCJK(t4) ? toText(toURL(t4)) : 'no use'}</p>
    </>
  )
}

// const testCJKchar = (string) => {
//   let regExp =
//     /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g

//   return regExp.test(string) ? true : false
// }

// export async function getStaticProps(context) {
//   const punycode = require('punycode')

//   const origin = 'NIKE手機商品'

//   let encodeStr = ''
//   const shouldKebabIndex = []

//   for (let i = 0; i < origin.length; i++) {
//     if (testCJKchar(origin[i])) {
//       encodeStr += origin[i]
//       shouldKebabIndex[i] = false
//     } else {
//       encodeStr += origin[i].toLowerCase()
//       shouldKebabIndex[i] = true
//     }
//   }

//   // split sub string
//   for (let i = 0; i < encodeStr.length; i++) {}

//   console.log(encodeStr, shouldKebabIndex)
//   const encodeUrl = punycode.encode(origin.toLowerCase())
//   const kebabUrl = _.kebabCase(encodeUrl)
//   const decodeUrl = punycode.decode(encodeUrl)

//   return {
//     props: {
//       origin,
//       encodeUrl,
//       kebabUrl,
//       decodeUrl,
//     },
//   }
// }
