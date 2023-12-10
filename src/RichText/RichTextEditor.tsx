import { memo, useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import { EditorProvider } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { mergeDeepRight } from 'ramda'

import { TopBar } from './TopBar'
import { CharCount } from './CharCount'
import { commonExtensions, commonWrapperStyles } from './config'

import type { BoxProps, SystemStyleObject } from '@chakra-ui/react'
import type { EditorEvents } from '@tiptap/react'
import type { RichTextCommonProps } from './type'

interface RichTextEditorProps extends RichTextCommonProps {
  limit?: number
  height?: BoxProps['height']
  disabled?: boolean
  placeholder?: string
  error?: boolean
  onChange?: (content: string) => void
}

const emptyHtml = '<p></p>'

export const RichTextEditor = memo(
  ({ content, error, placeholder, limit, height, disabled, onChange }: RichTextEditorProps) => {
    const extensions = useMemo(
      () => [
        ...commonExtensions,
        Placeholder.configure({
          placeholder,
        }),
        CharacterCount.configure({
          limit,
        }),
      ],
      [placeholder, limit]
    )

    const handleUpdate = ({ editor }: EditorEvents['update']) => {
      if (!onChange) return

      const html = editor.getHTML()
      if (html === emptyHtml) onChange('')
      onChange(html)
    }

    return (
      <Box
        style={{
          '--rte-content-height': String(height),
          '--rte-content-border-width': error ? '2px' : '1px',
          '--rte-content-border-color': error ? 'red' : 'gray',
        }}
        sx={wraperStyles}
        // chakra и его типы не знают про inert (chrome 102+), этот аттрибут гасит весь интерактив вниз по дереву. Пропс`editable` на EditorProvider не пройдет - tiptap не обновляет инстанс, пришлось бы его размонтировать и смонтировать заново, для disabled состояние это имхо слишком
        {...(disabled && { inert: '' })}
      >
        <EditorProvider
          extensions={extensions}
          slotBefore={<TopBar disabled={disabled} />}
          slotAfter={limit && <CharCount limit={limit} />}
          content={content}
          enableInputRules={false}
          enablePasteRules={false}
          onUpdate={handleUpdate}
          editorProps={{
            attributes: {
              spellcheck: 'true',
            },
          }}
        >
          {/* EditorProvider требует обязательный children */}
        </EditorProvider>
      </Box>
    )
  }
)

const wraperStyles: SystemStyleObject = mergeDeepRight(commonWrapperStyles, {
  '.ProseMirror': {
    padding: '16px',
    borderWidth: 'var(--rte-content-border-width, 1px)',
    borderStyle: 'solid',
    borderColor: 'var(--rte-content-border-color, gray)',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    outline: 'none',
    overflowY: 'scroll',
    height: 'var(--rte-content-height)',

    'p.is-editor-empty:first-of-type::before': {
      color: 'gray',
      content: 'attr(data-placeholder)',
      float: 'left',
      height: 0,
      pointerEvents: 'none',
    },
  },
})

RichTextEditor.displayName = 'RichTextEditor'
