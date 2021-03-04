import classNames from './index.css'
import { Icon } from 'antd'
import { connect } from 'dva'
import { eachBefore } from '../../utils/tree'
import Box from '../Box'
import Input from '../Input'
import React, { useState } from 'react'
import { LanguageType, LocalesType } from '../../utils/types'

export default connect(
  ({ slides, global }: { slides: any; global: any }) => ({
    components: slides.components,
    selectedId: slides.selectedId,
    selectedComponentId: slides.selectedComponentId,
    variables: slides.attributeVars,
    locales: global.locales,
    lang: global.lang,
  }),
  {
    changeAttr: (value: any, key: any, cmpId: any, rootId: any) => ({
      type: 'slides/changeAttr',
      payload: { value, key, cmpId, rootId },
    }),
    deleteVarForCmp: (key: any, cmpId: any, rootId: any) => ({
      type: 'slides/deleteVarForCmp',
      payload: { key, cmpId, rootId },
    }),
    selectVar: (id: any) => ({ type: 'slides/selectVar', payload: { id } }),
  },
)(function({
  height,
  components,
  selectedId,
  selectedComponentId,
  changeAttr,
  variables,
  deleteVarForCmp,
  selectVar,
  locales,
  lang,
}: {
  height: number
  components: any
  selectedId: number | string
  selectedComponentId: number | string
  changeAttr: any
  variables: any
  deleteVarForCmp: any
  selectVar: any
  locales: LocalesType
  lang: LanguageType
}) {
  const [dragover, setDragover] = useState('')
  const slide = components.find((item: any) => item.id === selectedId)
  let selectedCmp
  selectedComponentId &&
    eachBefore(slide, node => {
      if (node.id === selectedComponentId) {
        selectedCmp = node
      }
    })

  const attrs = getAttrs(selectedCmp)
  type InputByAttrType =
    | 'fontSize'
    | 'color'
    | 'backgroundColor'
    | 'flex'
    | 'fontWeight'
    | 'padding'
    | 'textAlign'
    | 'verticalAlign'
    | 'span'
    | 'displayMode'
  type TypeType = 'number' | 'color' | 'radio' | 'switch' | 'array' | 'image'
  const inputByAttr = {
    fontSize: {
      type: 'number' as TypeType,
      name: locales.FONT_SIZE[lang],
      icon: 'font-size',
      range: [0, 500],
    },
    color: {
      type: 'color' as TypeType,
      name: locales.FONT_COLOR[lang],
      icon: 'font-colors',
    },
    backgroundColor: {
      type: 'color' as TypeType,
      name: locales.BG_COLOR[lang],
      icon: 'bg-colors',
    },
    flex: {
      type: 'radio' as TypeType,
      name: locales.DIRECTION[lang],
      icon: 'menu',
      hasIcon: false,
      list: [
        {
          name: locales.ROW[lang],
          value: 'row',
        },
        {
          name: locales.COL[lang],
          value: 'column',
        },
      ],
    },
    fontWeight: {
      type: 'switch' as TypeType,
      name: locales.BOLD[lang],
      icon: 'bold',
      yes: 'bold',
    },
    padding: {
      type: 'number' as TypeType,
      name: locales.PADDING[lang],
      icon: 'border',
      range: [0, 100],
    },
    textAlign: {
      type: 'radio' as TypeType,
      name: locales.H_ALIGNMENT[lang],
      icon: 'profile',
      list: [
        {
          name: locales.LEFT[lang],
          value: 'left',
          icon: 'align-left',
        },
        {
          name: locales.CENTER[lang],
          value: 'center',
          icon: 'align-center',
        },
        {
          name: locales.RIGHT[lang],
          value: 'right',
          icon: 'align-right',
        },
      ],
    },
    verticalAlign: {
      type: 'radio' as TypeType,
      name: locales.V_ALIGNMENT[lang],
      icon: 'project',
      list: [
        {
          name: locales.TOP[lang],
          value: 'top',
          icon: 'vertical-align-top',
        },
        {
          name: locales.MIDDLE[lang],
          value: 'center',
          icon: 'vertical-align-middle',
        },
        {
          name: locales.BOTTOM[lang],
          value: 'bottom',
          icon: 'vertical-align-bottom',
        },
      ],
    },
    span: {
      type: 'array' as TypeType,
      name: locales.RATIO[lang],
      icon: 'layout',
    },
    displayMode: {
      type: 'switch' as TypeType,
      name: locales.FULL_IMAGE[lang],
      icon: 'fullscreen',
      yes: 'scaleToFill',
    },
  }

  function getAttrs(selectedCmp: any) {
    if (!selectedCmp || !selectedCmp.attrs) return []
    return Object.keys(selectedCmp.attrs).reduce((arr: any, key) => {
      if (key === 'isTitle' || key === 'fontFamily') return arr
      let isVar = false
      let varId: any = null
      let attrValue = selectedCmp.attrs[key]
      if (typeof attrValue === 'string' && attrValue[0] === '$') {
        isVar = true
        varId = parseInt(attrValue.slice(1))
        const v = variables.find((item: any) => item.id === varId)
        attrValue = v.value
      }
      const obj = {
        isVar,
        attrValue,
        varId,
        key,
      }
      return [...arr, obj]
    }, [])
  }

  function handleVarDrop(e: any, attr: any) {
    const [type, id] = e.dataTransfer.getData('attr').split('-')
    const mp = {
      color: ['color', 'backgroundColor'],
      number: ['fontSize', 'padding'],
    }
    type MpType = 'color' | 'number'
    const arr = mp[type as MpType]
    const index = arr.indexOf(attr)
    if (index === -1) alert(locales.TYPE_MISMATCH[lang])
    else changeAttr(`$${id}`, attr, selectedComponentId, selectedId)
    setDragover('')
  }

  function scrollTo(id: any) {
    const a = document.createElement('a')
    a.href = `#${id}`
    a.click()
  }

  return (
    <Box
      title={locales.STYLE[lang]}
      height={height}
      nodataInfo={locales.NO_SELECTED_COMPONENT[lang]}
      nodata={attrs.length === 0}
      name="attr"
      url="https://github.com/pearmini/gossip#revising-style-and-variable"
    >
      <ul className={classNames.container}>
        {attrs.map((item: any, index: number) => {
          const { icon, name, ...rest } = inputByAttr[
            item.key as InputByAttrType
          ]
          return (
            <li
              key={index}
              className={classNames.item}
              style={{ background: '#4091f7' }}
              onDragEnter={() => setDragover(item.key)}
              onDragOver={e => {
                if (item.key !== dragover) setDragover(item.key)
                e.preventDefault()
              }}
              onDragLeave={() => setDragover('')}
              onDrop={e => handleVarDrop(e, item.key)}
            >
              <Icon type={icon} />
              <span className={classNames.name}>{name}</span>
              <Input
                value={item.attrValue}
                onChange={(value: any) =>
                  changeAttr(value, item.key, selectedComponentId, selectedId)
                }
                disabled={item.isVar}
                {...rest}
              />
              {item.isVar && (
                <div className={classNames.btns}>
                  <Icon
                    type="eye"
                    className={classNames.icon}
                    onClick={() => {
                      selectVar(item.varId)
                      scrollTo(item.varId)
                    }}
                  />
                  <Icon
                    type="delete"
                    onClick={() =>
                      deleteVarForCmp(item.key, selectedComponentId, selectedId)
                    }
                  />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </Box>
  )
})
