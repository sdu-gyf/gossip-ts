import classNames from './index.css'
import Header from '@/components/Header'
import useWindowSize from 'react-use/lib/useWindowSize'
import { connect } from 'dva'
import React, { useEffect } from 'react'
import SidebarPanel from '../../components/SidebarPanel'
import MainContent from '../../components/MainContent'

export default connect(
  ({ global }: any) => ({
    show: global.show,
    locales: global.locales,
  }),
  {
    setLocales: () => ({ type: 'global/setLocales' }),
  },
)(function({
  show,
  setLocales,
  locales,
}: {
  show: any
  setLocales: any
  locales: any
}) {
  const { height, width } = useWindowSize()
  const { structure, attr, vari } = show
  const headerHeight = 60,
    contentHeight = height - headerHeight,
    total = structure + attr + vari,
    totalHeight = contentHeight - (3 - total) * 45,
    structureHeight = (totalHeight * structure) / total,
    attrPanelHeight = (totalHeight * attr) / total,
    varHeight = (totalHeight * vari) / total

  const props = {
    header: {
      height: headerHeight,
    },
    sidebar: {
      height: contentHeight,
    },
    mainContent: {
      height: contentHeight,
      width: width - 600,
    },
    structure: {
      height: structureHeight,
    },
    attrPanel: {
      height: attrPanelHeight,
    },
    Variables: {
      height: varHeight,
    },
  }

  useEffect(() => {
    setLocales()
  }, [setLocales])

  return (
    <div className={classNames.container}>
      <Header {...props.header} />
      <div className={classNames.content}>
        <div className={classNames.left}>
          <SidebarPanel {...props.sidebar} />
        </div>
        <div className={classNames.main}>
          <MainContent {...props.mainContent} />
        </div>
        <div className={classNames.right}>Structure AttrPanel Variables</div>
      </div>
    </div>
  )
})
