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
    locales?: any
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
  locales?: any
}

export type ActionType = {
  payload: {
    lang?: LanguageType
    hoveredId?: number
    dragId?: number
    enterId?: number
    scale?: number
    key: KeyType
  }
}

export type KeyType = 'idea' | 'structure' | 'attr' | 'variable'
