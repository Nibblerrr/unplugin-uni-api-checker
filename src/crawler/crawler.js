import { appendFileSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import Crawler from 'crawler'

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
const writePath = path.join(_dirname, './result1.json')

function processApiContent(content) {
  // const apiContent = content.trim()
  return content.trim().replace(/\(.*?\)/g, '')
}

function processToFinalData(H3List, table) {
  const nameList = table?.children[0]?.children[0]?.children
  const valueList = table?.children[2]?.children[0]?.children
  const resultList = {}

  H3List.forEach((content) => {
    // API的名字
    const apiContent = processApiContent(content?.children[1].data)
    if (!apiContent.includes('uni.')) {
      return
    }
    if (!resultList[apiContent]) {
      resultList[apiContent] = []
    }
    for (let i = 0; i < nameList.length; i++) {
      if (valueList[i].children) {
        let textData = nameList[i].children[0].data
        //   判断链接的特殊情况
        if (!textData) {
          textData = nameList[i].children[0].children[0].data
        }

        resultList[apiContent].push({
          type: textData,
          value: valueList[i].children[0].data,
        })
      }
    }
  })

  return resultList
}

function processTitleToGetData($, item) {
  const title = $('strong')
  // 平台差异上一级的p元素
  const p_Element = title[item].parent
  if (title[item] && title[item].children) {
    if (title[item].children[0]?.data?.includes('平台差异')) {
      // 获取平台差异的前一个h3元素
      const isH3 = $(p_Element).prevAll('h3')[0]
      let H3List = []
      if (isH3) {
        // console.log('找到h3')

        H3List.push(isH3)
        // console.log(H3List[0].children[1].data)
      } else {
        // console.log('没找到h3')
        //   获取平台差异的后面全部h3元素
        H3List = Array.from($(p_Element).nextAll('h3'))
      }

      // 表格、兼容性平台名字、兼容性列表
      const table = $(p_Element).nextAll('table')[0]
      return { H3List, table }
    }
  }
  return { H3List: [], table: undefined }
}

function writeJSONFile(resultList) {
  if (Object.keys(resultList).length) {
    let appendData = JSON.stringify(resultList, null, 2)
    appendData = appendData.substring(1, appendData.length - 1)
    appendFileSync(writePath, appendData)
    appendFileSync(writePath, ',')
  }
}

const c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error)
    } else {
      let resultList = {}
      const $ = res.$

      const title = $('strong')

      for (const item in title) {
        const { H3List, table } = processTitleToGetData($, item)

        if (H3List.length && table) {
          resultList = processToFinalData(H3List, table)
          //  写入json
          writeJSONFile(resultList)
        }
      }

      done()
    }

    if (c.queueSize === 0) {
      appendFileSync(writePath, '}')
      console.log('done')
    }
  },
})

// Queue a list of URLs
const res = readFileSync(path.join(_dirname, './url.csv'), 'utf8')
const dataList = res
  .split('\r\n')
  .map((item, index, list) => {
    const name = item.split(',')[0]
    const url = item.split(',')[1]
    if (index > 1 && url) {
      let beforeURL = list[index - 1].split(',')[1].split('#')[0]
      let commonURL = url.split('#')[0]
      if (!commonURL.endsWith('html')) {
        commonURL += '.html'
      }

      if (!beforeURL.endsWith('html')) {
        beforeURL += '.html'
      }
      if (beforeURL === commonURL) {
        return undefined
      }
    }
    if (url === undefined) {
      return undefined
    }
    return { name, url }
  })
  .filter((item) => item !== undefined)
console.log(dataList)
appendFileSync(writePath, '{')

const crawler = promisify((list) => c.queue(list))

crawler(dataList.map((item) => item.url))
