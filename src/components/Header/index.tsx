import classNames from './index.css'
import { Upload, Icon } from 'antd'
import router from 'umi/router'
import { connect } from 'dva'
import React, { useState } from 'react'
import { LanguageType, LocalesType } from '@/utils/types'

function Item({
  icon,
  name,
  onClick,
}: {
  icon: any
  name: any
  onClick?: any
}) {
  return (
    <span className={classNames.item} onClick={onClick}>
      <span className={classNames.title}>
        <Icon type={icon} className={classNames.icon} key={icon} />
        {name}
      </span>
    </span>
  )
}

export default connect(
  ({ global }: any) => ({
    lang: global.lang,
    locales: global.locales,
  }),
  {
    createNewFile: () => ({ type: 'slides/createNewFile' }),
    download: () => ({ type: 'slides/download' }),
    upload: (data: any) => ({ type: 'slides/upload', payload: { data } }),
    save: () => ({ type: 'slides/save' }),
    help: () => ({ type: 'slides/createHelp' }),
    example: () => ({ type: 'slides/createExample' }),
    setSelected: (id: number | string) => ({
      type: 'slides/setSelected',
      payload: { id },
    }),
    setLang: (lang: 'zh' | 'en') => ({
      type: 'global/setLang',
      payload: { lang },
    }),
  },
)(function({
  height,
  createNewFile,
  download,
  upload,
  save,
  help,
  example,
  setSelected,
  lang,
  locales,
  setLang,
}: {
  height: number
  createNewFile: () => any
  download: () => any
  upload: (data: any) => any
  save: () => any
  help: () => any
  example: () => any
  setSelected: (id: number) => any
  setLang: (lang: 'zh' | 'en') => any
  lang: LanguageType
  locales: LocalesType
}) {
  const [show, setShow] = useState(false)
  const [showLang, setShowLang] = useState(false)
  const styles = {
    header: {
      height,
      lineHeight: height + 'px',
    },
  }

  const btns = [
    {
      icon: 'play-circle',
      onClick: () => {
        fullscreen(document.documentElement)
        setSelected(1)
        router.push('/present')
      },
      name: locales.PLAY_HEAD[lang],
    },
    {
      icon: 'play-square',
      onClick: () => {
        fullscreen(document.documentElement)
        router.push('/present')
      },
      name: locales.PLAY_CURRENT[lang],
    },
    {
      icon: 'file-add',
      onClick: createNewFile,
      name: locales.NEW_FILE[lang],
    },
    {
      icon: 'save',
      onClick: save,
      name: locales.SAVE_FILE[lang],
    },
    {
      icon: 'download',
      onClick: download,
      name: locales.DOWNLOAD_FILE[lang],
    },
    {
      icon: 'upload',
      onClick: handleUploadFile,
      type: 'upload',
      name: locales.UPLOAD_FILE[lang],
    },
    {
      icon: 'read',
      name: locales.EXAMPLE[lang],
      type: 'select',
      value: show,
      onClick: (e: any) => {
        setShow(!show)
        e.stopPropagation()
      },
      items: [
        { name: locales.DESCRIPTION[lang], onClick: help, icon: 'fire' },
        {
          name: locales.TUTORIALS[lang],
          onClick: example,
          icon: 'thunderbolt',
        },
      ],
    },
    {
      icon: 'github',
      onClick: gotoGithub,
      name: 'github',
    },
    {
      icon: 'setting',
      name: locales.LANG[lang],
      onClick: (e: any) => {
        setShowLang(!showLang)
        e.stopPropagation()
      },
      type: 'select',
      value: showLang,
      items: [
        {
          name: locales.LANG_EN[lang],
          onClick: () => setLang('en'),
          icon: 'dollar',
        },
        {
          name: locales.LANG_ZN[lang],
          onClick: () => setLang('zh'),
          icon: 'transaction',
        },
      ],
    },
  ]

  function fullscreen(element: any) {
    if (element.requestFullScreen) {
      element.requestFullScreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    }
  }

  function handleUploadFile(e: any) {
    const { file } = e
    const reader = new FileReader()
    reader.onload = function(e) {
      const data = e.target!.result
      const slides = JSON.parse(data as string)
      upload(slides)
    }
    reader.readAsText(file.originFileObj, 'UTF-8')
  }

  function gotoGithub() {
    const url = 'https://github.com/pearmini/gossip'
    window.open(url)
  }

  return (
    <div
      className={classNames.container}
      style={styles.header}
      onMouseLeave={() => show && setShow(false)}
    >
      <header className={classNames.header}>
        <div className={classNames.left}>
          <div className={classNames.logo} onClick={gotoGithub}>
            Gossip
          </div>
          <div className={classNames.intro}>{locales.HEADER_INFO[lang]}🔥</div>
        </div>
        <div className={classNames.btns}>
          {btns.map(({ type, onClick, icon, name, items, value }) =>
            type === 'upload' ? (
              <Upload
                onChange={handleUploadFile}
                key={name}
                showUploadList={false}
              >
                <Item icon={icon} name={name} />
              </Upload>
            ) : type === 'select' ? (
              <div className={classNames.selectWrapper} key={name}>
                <Item icon={icon} name={name} onClick={onClick} />
                {value && (
                  <ul onClick={onClick} className={classNames.select}>
                    {items!.map(i => (
                      <li className={classNames.selectItem} key={i.name}>
                        <Item icon={i.icon} onClick={i.onClick} name={i.name} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Item icon={icon} onClick={onClick} name={name} key={name} />
            ),
          )}
        </div>
      </header>
    </div>
  )
})
