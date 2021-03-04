import classNames from './index.css'
import { connect } from 'dva'
import React, { useState } from 'react'
import { Icon, Input, Popover } from 'antd'
import { MyImage } from '../Input'
import { CSSProperties } from 'react'
const { TextArea } = Input
export default connect(
  ({ slides }: any) => ({
    selectedIdea: slides.selectedIdea,
  }),
  {
    deleteIdea: (id: any) => ({ type: 'slides/deleteIdea', payload: { id } }),
    saveIdea: (id: any, value: any) => ({
      type: 'slides/saveIdea',
      payload: { id, value },
    }),
    setSelectedIdea: (id: any) => ({
      type: 'slides/setSelectedIdea',
      payload: { id },
    }),
    setHovered: (id: any) => ({ type: 'global/setHovered', payload: { id } }),
  },
)(function({
  content,
  deleteIdea,
  saveIdea,
  selectedIdea,
  setSelectedIdea,
  setHovered,
  id: elId,
}: {
  content: any
  deleteIdea: any
  saveIdea: any
  selectedIdea: any
  setSelectedIdea: any
  setHovered: any
  id: any
}) {
  const { type, id, value } = content
  const [edit, setEdit] = useState(false)
  const [enter, setEnter] = useState(false)
  const styles = {
    box: {
      border: selectedIdea === id ? '1px solid #4091f7' : '1px solid #d9d9d9',
    },
    input: { height: '100%', width: '100%', resize: 'none' },
    tool: {
      opacity: enter && !edit ? 1 : 0,
    },
  }

  function handleDragStart(e: any, item: any) {
    e.dataTransfer.setData('drag', `idea-${item.id}`)
    setEnter(false)
  }

  return (
    <div
      id={elId}
      onClick={() => setSelectedIdea(id)}
      draggable
      onDragStart={e => handleDragStart(e, content)}
      onDragEnd={e => setHovered(-1)}
      className={classNames.container}
      onMouseLeave={() => setEnter(false)}
      onMouseEnter={() => setEnter(true)}
      onMouseOver={() => !enter && setEnter(true)}
    >
      <div className={classNames.box} style={styles.box}>
        {type === 'image' ? (
          <div
            data-src={value}
            className={classNames.image}
            draggable
            style={{
              backgroundImage: `url(${value})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              height: '100%',
              width: '100%',
              backgroundPosition: 'center center',
            }}
          />
        ) : edit ? (
          <TextArea
            style={styles.input as CSSProperties}
            value={value}
            onChange={e => saveIdea(id, e.target.value)}
          />
        ) : (
          <div className={classNames.text}>{value}</div>
        )}
        {edit && (
          <div className={classNames.save}>
            <Icon type="save" onClick={() => setEdit(false)} theme="filled" />
          </div>
        )}
        <div className={classNames.tool} style={styles.tool}>
          {type === 'image' ? (
            <Popover
              content={<MyImage onChange={value => saveIdea(id, value)} />}
            >
              <Icon type="edit" theme="filled" />
            </Popover>
          ) : (
            <Icon type="edit" onClick={() => setEdit(!edit)} theme="filled" />
          )}
          <Icon
            type="delete"
            onClick={() => deleteIdea(id)}
            theme="filled"
            className={classNames.deleteBtn}
          />
        </div>
      </div>
    </div>
  )
})
