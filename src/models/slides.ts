import introZHFile from '@/assets/data/intro.zh.json'
import introENFile from '@/assets/data/intro.en.json'
import exampleFile from '@/assets/data/snake.json'
import { saveAs } from 'file-saver'
import { eachBefore, descendant } from '@/utils/tree'
import { createCanvas, createImage, createPanel, createSlide, createFile, createIdea, createText } from '@/utils/create'

function initData() {
  const lang = 'zh'
  try {
    const introFile = lang === 'zh' ? introZHFile : introENFile
    // const data = JSON.parse(localStorage.getItem('uIdea')) || introFile
  } catch (e) {}
}
