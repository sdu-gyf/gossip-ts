export type WordType = {
  x: number
  y: number
  data: {
    width: number
    height: number
  }
}

export type AttributesType = {
  font?: '$4' | string
  color?: '$5' | string
  fontWeight?: 'normal' | 'bold' | string
  textAlign?: 'left' | 'right' | 'center'
  verticalAlign?: 'top' | 'center' | 'bottom'
  padding?: number | '$6' | string
  isTitle?: boolean
  displayMode?: 'normal' | string
  span?: number[]
  flex?: any
  backgroundColor?: '$1' | string
  fontSize?: '$3' | string | number
}

export type LanguageType = 'zh' | 'en'

export type PutState = {
  type: 'slides/setLocales' | 'setLangState' | 'slides/setLang'
  payload: {
    lang?: LanguageType
    locales?: LocalesType
  }
}

export type StateType = {
  lang?: LanguageType
  hoveredId?: number
  enterId?: number
  dragId?: number
  scale?: number
  help?: boolean
  show?: {
    idea?: number
    structure?: number
    attr?: number
    variable?: number
  }
  locales?: LocalesType
}

export type ActionType = {
  payload: {
    lang?: LanguageType
    hoveredId?: number
    dragId?: number
    enterId?: number
    scale?: number
    key?: KeyType
    locales?: LocalesType
  }
}

export type KeyType = 'idea' | 'structure' | 'attr' | 'variable'

export type IdeaStateType = {
  selectedIdea: number
  selectedId: number
  ideas: {
    id: number
    value: any
    type: IdeaType
  }[]
  components?: ComponentType[]
}

export type IdeaActionType = {
  payload: {
    id?: number
    type?: IdeaType
    value?: any
    ideaId?: number
    rootId?: number
    nodeId?: number
  }
}

export type IdeaType = 'text' | 'image' | 'canvas'

export type FileStateType = {
  lang?: LanguageType
  locales?: LocalesType
  file?: any
  filename?: string
}

export type FileActionType = {
  payload: {
    data?: any
  }
}

export type ActiveStateType = {
  selectedPanel?: IdeaType | 2
  selectedId?: number
  selectedComponentId?: number
  structure?: any
  locales?: LocalesType
  lang?: LanguageType
}

export type ActiveActionType = {
  payload: {
    type?: IdeaType
    id?: number
  }
}

export type NodeStateType = {
  selectedId?: number
  locales?: LocalesType
  lang?: LanguageType
  structure: {
    id?: number
    name?: string
    children?: {
      id?: number
    }
    _children?: {
      id?: number
    }
  }
  components: ComponentType[]
}

export type NodeActionType = {
  payload: {
    id?: number
    nodeId?: number
    value?: string
    father?: any
    brother?: any
    before?: any
    type?: 'children' | string
  }
}

export type LocalesType = {
  HEADER_INFO: LocalesChildrenType
  PLAY_HEAD: LocalesChildrenType
  PLAY_CURRENT: LocalesChildrenType
  NEW_FILE: LocalesChildrenType
  SAVE_FILE: LocalesChildrenType
  DOWNLOAD_FILE: LocalesChildrenType
  UPLOAD_FILE: LocalesChildrenType
  DESCRIPTION: LocalesChildrenType
  TUTORIALS: LocalesChildrenType
  LANG: LocalesChildrenType
  EXAMPLE: LocalesChildrenType
  LANG_EN: LocalesChildrenType
  LANG_ZN: LocalesChildrenType
  OUTLINE: LocalesChildrenType
  THUMBNAILS: LocalesChildrenType
  THOUGHT: LocalesChildrenType
  THOUGHT_TEXT: LocalesChildrenType
  THOUGHT_IMAGE: LocalesChildrenType
  THOUGHT_CANVAS: LocalesChildrenType
  THOUGHT_CONTAINER: LocalesChildrenType
  CHOOSE_TYPE: LocalesChildrenType
  NO_IDEA: LocalesChildrenType
  ELEMENT: LocalesChildrenType
  NO_SELECTED_SLICE: LocalesChildrenType
  FONT_SIZE: LocalesChildrenType
  STYLE: LocalesChildrenType
  NO_SELECTED_COMPONENT: LocalesChildrenType
  FONT_COLOR: LocalesChildrenType
  BG_COLOR: LocalesChildrenType
  BOLD: LocalesChildrenType
  PADDING: LocalesChildrenType
  FULL_IMAGE: LocalesChildrenType
  RATIO: LocalesChildrenType
  DIRECTION: LocalesChildrenType
  ROW: LocalesChildrenType
  COL: LocalesChildrenType
  H_ALIGNMENT: LocalesChildrenType
  V_ALIGNMENT: LocalesChildrenType
  LEFT: LocalesChildrenType
  CENTER: LocalesChildrenType
  RIGHT: LocalesChildrenType
  MIDDLE: LocalesChildrenType
  TOP: LocalesChildrenType
  BOTTOM: LocalesChildrenType
  COLOR: LocalesChildrenType
  NUMBER: LocalesChildrenType
  VARIABLE: LocalesChildrenType
  NO_VARIABLE: LocalesChildrenType
  TYPE_MISMATCH: LocalesChildrenType
  NO_DATA: LocalesChildrenType
  RUNTIME_ERROR: LocalesChildrenType
  TRY_DEBUG: LocalesChildrenType
  NO_IMAGE: LocalesChildrenType
  LOCAL_IMAGE: LocalesChildrenType
  NETWORK_IMAGE: LocalesChildrenType
  INPUT_IMAGE_URL: LocalesChildrenType
  CONFIRM: LocalesChildrenType
  CANCEL: LocalesChildrenType
  NO_EMPTY_IMAGE_URL: LocalesChildrenType
  BIG_SCREEN: LocalesChildrenType
  NEW_POINT: LocalesChildrenType
  ROW_CONTAINER: LocalesChildrenType
  COL_CONTAINER: LocalesChildrenType
  NO_TITLE: LocalesChildrenType
  ONLY_CONTAINER: LocalesChildrenType
  ROOT_NO_BROTHER: LocalesChildrenType
  SAVE_SUCCESS: LocalesChildrenType
  SAVE_FAIL: LocalesChildrenType
  FIRST_PAGE: LocalesChildrenType
  LAST_PAGE: LocalesChildrenType
  SAY_TEXT: LocalesChildrenType
  NO_NAME: LocalesChildrenType
  NEW_FILE_NAME: LocalesChildrenType
  NEW_FILE_CREATOR: LocalesChildrenType
  NEW_FILE_BG_COLOR: LocalesChildrenType
  NEW_FILE_H1: LocalesChildrenType
  NEW_FILE_H2: LocalesChildrenType
  NEW_FILE_CONTENT: LocalesChildrenType
  NEW_FILE_FONT_COLOR: LocalesChildrenType
  NEW_FILE_PADDING: LocalesChildrenType
  NEW_FILE_THOUGHT: LocalesChildrenType
  TIP: LocalesChildrenType
  LEARN: LocalesChildrenType
  CHECK_AROUND: LocalesChildrenType
  DIFFERENT: LocalesChildrenType
  LEARN_TIME: LocalesChildrenType
  NEW_WAY: LocalesChildrenType
  BEST: LocalesChildrenType
  NO_REMINDER: LocalesChildrenType
  NEW_POINT_INFO: LocalesChildrenType
}

export type LocalesChildrenType = {
  en: string
  zh: string
}

export type ComponentType = {
  type?: string
  id?: string | number
  value?: any
  attrs?: AttributesType
  children?: any
}
