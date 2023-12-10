import { memo } from 'react'
import { Box } from '@chakra-ui/react'
import { EditorProvider } from '@tiptap/react'

import { commonExtensions, commonWrapperStyles } from './config'
import type { RichTextCommonProps } from './type'

interface RichTextEditorProps extends RichTextCommonProps {}

export const RichTextViewer = memo(({ content }: RichTextEditorProps) => {
  return (
    <Box sx={commonWrapperStyles}>
      <EditorProvider
        extensions={commonExtensions}
        editable={false}
        content={content}
        key={content}
      >
        {/* EditorProvider требует обязательный children */}
      </EditorProvider>
    </Box>
  )
})

RichTextViewer.displayName = 'RichTextViewer'
