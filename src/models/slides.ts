import introZHFile from '@/assets/data/intro.zh.json'
import introENFile from '@/assets/data/intro.en.json'
import exampleFile from '@/assets/data/snake.json'
import { saveAs } from 'file-saver'
import { eachBefore, descendant } from '@/utils/tree'
import {
  createCanvas,
  createImage,
  createPanel,
  createSlide,
  createFile,
  createIdea,
  createText,
} from '@/utils/create'
import {
  ActionType,
  ActiveActionType,
  ActiveStateType,
  FileActionType,
  FileStateType,
  IdeaActionType,
  IdeaStateType,
  NodeActionType,
  NodeStateType,
  StateType,
} from '@/utils/types'

function initData() {
  const lang = 'zh'
  let data
  try {
    const introFile = lang === 'zh' ? introZHFile : introENFile
    if (localStorage.getItem('uIdea') !== null) {
      data = JSON.parse(localStorage.getItem('uIdea')!)
    } else {
      data = introFile
    }
    data.selectedId = 1
    return data
  } catch (e) {
    const msg =
      lang === 'zh'
        ? '读取本地存储失败，请在隐私中将“阻止所有 Cookies”关闭，否者不能使用本地存储！！！'
        : "Failed to load local storage, please close 'block all cookies' in privacy"
    alert(msg)
    return exampleFile
  }
}

export default {
  namespace: 'slides',
  state: initData(),
  effects: {},
  reducers: {
    setLang(state: StateType, action: ActionType) {
      const { lang } = action.payload
      return { ...state, lang }
    },
    setLocales(state: StateType, action: ActionType) {
      const { locales, lang } = action.payload
      return { ...state, locales, lang }
    },
    /** 和 Idea 相关 */
    deleteIdea(state: IdeaStateType, action: IdeaActionType) {
      const { id } = action.payload
      const idea = state.ideas.find(item => item.id === id)
      const index = state.ideas.indexOf(idea!)
      state.ideas!.splice(index, 1)
    },
    addIdea(state: IdeaStateType, action: IdeaActionType) {
      const id = new Date().getTime()
      const { type } = action.payload
      const idea = createIdea(id, type!)
      state.ideas.push(idea)
      state.selectedIdea = id
      return state
    },
    saveIdea(state: IdeaStateType, action: IdeaActionType) {
      const { id, value } = action.payload
      const idea = state.ideas.find(item => item.id === id)
      idea!.value = value
      return state
    },
    injectIdea(state: IdeaStateType, action: IdeaActionType) {
      const { ideaId, id, rootId } = action.payload
      const slide = state.components?.find(item => item.id === rootId)
      const idea = state.ideas.find(item => item.id === ideaId)
      // TODO Type of component
      let component: any
      eachBefore(slide, node => node.id === id && (component = node))
      if (component!.type === 'panel') {
        const id = new Date().getTime()
        const mp = {
          text: createText(id, idea?.value, { isTitle: false }),
          image: createImage(id, idea?.value, {}),
          canvas: createCanvas(id, idea?.value, {}),
        }
        component.children.push(mp[idea!.type])
        component.attrs.span.push(1)
      } else if (component.type === idea?.type) {
        component.value = idea?.value
      } else {
        eachBefore(
          slide,
          node =>
            node.children &&
            node.children.forEach((d: any, index: number) => {
              if (d.id !== component.id) return
              const id = new Date().getTime()
              const mp = {
                text: createText(id, idea?.value, { isTitle: false }),
                image: createImage(id, idea?.value, {}),
                canvas: createCanvas(id, idea?.value, {}),
              }
              node.children.splice(index + 1, 0, mp[idea?.type!])
              node.attrs.span.splice(index + 1, 0, 1)
            }),
        )
      }
      return state
    },
    appendIdea(state: IdeaStateType, action: IdeaActionType) {
      const { nodeId, ideaId } = action.payload
      const idea = state.ideas.find(item => item.id === ideaId)
      const slide = state.components?.find(item => item.id === nodeId)
      const id = new Date().getTime()
      const mp = {
        text: createText(id, idea?.value, { isTitle: false }),
        image: createImage(id, idea?.value, {}),
        canvas: createCanvas(id, idea?.value, {}),
      }
      slide?.children.push(mp[idea?.type!])
      slide?.attrs?.span!.push(1)
      state.selectedId! = nodeId!
      return state
    },
    save(state: FileStateType, action: FileActionType) {
      const { lang, locales, ...file } = state
      try {
        // 这里可能会报错
        localStorage.setItem('uIdea', JSON.parse(file as string))
        alert(locales!.SAVE_SUCCESS[lang!])
      } catch (e) {
        console.log(e)
        alert(locales!.SAVE_FAIL[lang!])
      }
      return { ...state }
    },
    upload(state: FileStateType, action: FileActionType) {
      const { data } = action.payload
      return data
    },
    download(state: FileStateType, action: FileActionType) {
      const file = new File([JSON.stringify(state)], `${state.filename}.gsp`, {
        type: 'text/plain;charset=utf-8',
      })
      saveAs(file)
      return state
    },
    createNewFile(state: FileStateType) {
      const { lang, locales } = state
      const file = createFile(lang!, locales!)
      return { ...file, lang, locales }
    },
    createHelp(state: FileStateType) {
      const { lang, locales } = state
      const introFIle = lang == 'zh' ? introZHFile : introENFile
      return { ...introFIle, lang, locales }
    },
    createExample() {
      return exampleFile
    },
    setSelectedPanel(state: ActiveStateType, action: ActiveActionType) {
      const { type } = action.payload
      state.selectedPanel = type
      return state
    },
    setSelected(state: ActiveStateType, action: ActiveActionType) {
      const { id } = action.payload
      state.selectedId = id
      return state
    },
    setSelectedComponent(state: ActiveStateType, action: ActiveActionType) {
      const { id, type = 2 } = action.payload
      state.selectedComponentId = id
      state.selectedPanel = type
      return state
    },
    gotoPre(state: ActiveStateType) {
      const { structure, selectedId, locales, lang } = state
      const nodes = descendant(structure)
      const pre = nodes.find((_, index) => {
        if (index === nodes.length - 1) return
        return nodes[index + 1].id === selectedId
      })
      if (pre) {
        state.selectedId = pre.id
        return state
      } else {
        alert(locales?.FIRST_PAGE[lang!])
        return state
      }
    },
    gotoNext(state: ActiveStateType) {
      const { structure, selectedId, locales, lang } = state
      const nodes = descendant(structure)
      const next = nodes.find((_, index) => {
        if (!index) return
        return nodes[index - 1].id === selectedId
      })
      if (next) {
        state.selectedId = next.id
        return state
      } else {
        alert(locales?.LAST_PAGE[lang!])
        return state
      }
    },
    updateNodeValue(state: NodeStateType, action: NodeActionType) {
      const { id, value } = action.payload
      eachBefore(state.structure, node => {
        if (node.id === id) {
          node.name = value
        }
      })
      const slide = state.components.find(item => item.id === id)
      eachBefore(slide, node => {
        node.type === 'text' && node.attr.isTitle && (node.value = value)
      })
      return state
    },
    deleteNode(state: NodeStateType, action: NodeActionType) {
      const { id } = action.payload
      const component = state.components.find(item => item.id === id)
      const index = state.components.indexOf(component!)
      state.components.splice(index, 1)
      eachBefore(state.structure, node => {
        node.children &&
          // 预言一波这里火葬场
          node.children.forEach((item: any, index: number) => {
            if (item.id === id) {
              node.children.splice(index, 1)
            }
          })
      })
      state.selectedId = 1
      return state
    },
    createNode(state: NodeStateType, action: NodeActionType) {
      const { nodeId, value, type } = action.payload
      const { locales, lang } = state
      if (type !== 'children' && nodeId === 1) {
        alert(locales?.ROOT_NO_BROTHER[lang!])
        return
      }
      const id = new Date().getTime()
      const component = createSlide(
        id,
        value,
        lang!,
        locales!,
        locales?.NEW_POINT_INFO[lang!],
      )
      state.components.push(component)
      const slide = { id, name: value }
      if (type === 'children') {
        eachBefore(state.structure, node => {
          if (node.id === nodeId) {
            node.children = node.children || []
            node.children.splice(0, 0, slide)
          }
        })
      } else {
        eachBefore(state.structure, node => {
          node.children &&
            node.children.forEach((item: any, index: number) => {
              if (item.id === nodeId) {
                node.children.splice(index + 1, 0, slide)
              }
            })
        })
      }
      state.selectedId = id
      return state
    },
    hideNodeChildren(state: NodeStateType, action: NodeActionType) {
      const { id } = action.payload
      eachBefore(state.structure, node => {
        if (node.id === id) {
          node._children = node.children
          node.children = null
        }
      })
      return state
    },
    showNodeChildren(state: NodeStateType, action: NodeActionType) {
      const { id } = action.payload
      eachBefore(state.structure, node => {
        if (node.id === id) {
          node.children = node._children
          node._children = null
        }
      })
      return state
    },
    appendNode(state: NodeStateType, action: NodeActionType) {
      const { id, father } = action.payload
      let dragNode: any
      eachBefore(state.structure, node => {
        node.children &&
          node.children.forEach((item: any, index: number) => {
            if (item.id === id) {
              dragNode = item
              node.children.splice(index, 1)
            }
          })
      })
      dragNode &&
        eachBefore(state.structure, node => {
          if (node.id === father) {
            node.children = node.children || []
            node.children.push(dragNode)
          }
        })
      state.selectedId = dragNode.id
      return state
    },
    insertNode(state: NodeStateType, action: NodeActionType) {
      const { id, brother, before } = action.payload
      let dragNode: any
      eachBefore(state.structure, node => {
        node.children &&
          node.children.forEach((item: any, index: number) => {
            if (item.id === id) {
              dragNode = item
              node.children.splice(index, 1)
            }
          })
      })
      let isAdd = false
      dragNode &&
        eachBefore(state.structure, node => {
          node.children &&
            node.children.forEach((item: any, index: number) => {
              if (item.id === brother && isAdd) {
                const idx = before ? index : index + 1
                node.children.splice(idx, 0, dragNode)
              }
            })
        })
      state.selectedId = dragNode.id
      return state
    },
  },
}
