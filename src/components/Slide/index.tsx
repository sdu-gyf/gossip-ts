import classNames from './index.css'
import Panel from '../Panel'
import { connect } from 'dva'
import React from 'react'

export default connect(
  ({ global, slides }: any) => ({
    isDrag: global.isDragIdea,
    variables: slides.attributeVars,
  }),
  {
    appendIdea: (ideaId, nodeId) => ({
      type: 'slides/appendIdea',
      payload: { nodeId, ideaId },
    }),
  },
)(function({
  height = screen.height,
  width = screen.width,
  content,
  selected,
  editable = false,
  hasBorder = true,
  variables,
}: any) {
  const { value } = variables.find(item => item.id === 1)
  const { id } = content
  const styles = {
    container: {
      outline:
        !editable &&
        hasBorder &&
        (selected ? '10px solid #4091f7' : '10px solid #efefef'),
      height,
      width,
      backgroundColor: editable && (value ? value : 'white'),
      transformOrigin: 'left top',
    },
  }

  return (
    <div className={classNames.container} style={styles.container}>
      <Panel
        {...content}
        height={height}
        width={width}
        rootId={id}
        editable={editable}
      />
    </div>
  )
})
