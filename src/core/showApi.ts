import { table } from 'table'
import compatibilityList from '../crawler/result1.json'
import { defaultText, greenText, mapToPlatform, overbold, redText, yellowText } from './const'

import type { Compatibility, CompatibilityList, InCompatibilityList } from './types'
import { getFileName } from './utils'

const myCompatibilityList: CompatibilityList = compatibilityList

function createShowTable(item: string) {
  const showTable = []
  showTable.push(myCompatibilityList[item].map((data) => data.type))
  showTable.push(
    myCompatibilityList[item].map((data) => {
      if (data.value === 'x') {
        return redText + data.value + defaultText
      } else if (data.value === '√') {
        return greenText + data.value + defaultText
      } else {
        return yellowText + data.value + defaultText
      }
    }),
  )
  return showTable
}

function judgeIncompatibleAPI(item: string, platformValue: string | undefined) {
  if (platformValue !== undefined) {
    const isIncompatible = (data: Compatibility) => {
      return data.type === mapToPlatform[platformValue] && data.value === 'x'
    }
    if (myCompatibilityList[item].some(isIncompatible)) {
      return true
    } else {
      return false
    }
  }
}

function outputCompatibility(incompatibleList: InCompatibilityList[], platformValue: string | undefined) {
  if (platformValue !== undefined) {
    incompatibleList.forEach((item) => {
      console.log()
      console.log(
        redText,
        overbold,
        '注意:',
        item.name,
        `api在${mapToPlatform[platformValue]}不兼容`,
        defaultText,
      )
      console.log(table(item.table))
    })
  }
}

export default function showApi(apiList: Set<string>, id: string, platformValue: string | undefined) {
  const list = Array.from(apiList)
  let isOutputPath = false
  const incompatibleList: InCompatibilityList[] = []

  list.forEach((item) => {
    if (myCompatibilityList[item]) {
      if (!isOutputPath) {
        console.log()
        console.log(yellowText, '该文件路径使用如下api', defaultText, getFileName(id))
        isOutputPath = true
      }

      //   构建输出表格
      const showTable = createShowTable(item)

      //   判断不兼容性api
      const isIncompatibleAPI = judgeIncompatibleAPI(item, platformValue)
      if (isIncompatibleAPI) {
        incompatibleList.push({ name: item, table: showTable })
      } else {
        console.log(yellowText, overbold, item, '兼容性', defaultText)
        console.log(table(showTable))
      }
    }
  })

  //   输出不兼容的api
  outputCompatibility(incompatibleList, platformValue)
}
