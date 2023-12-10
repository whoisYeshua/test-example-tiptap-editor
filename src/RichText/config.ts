import { SystemStyleObject } from '@chakra-ui/react'
import { StarterKit } from '@tiptap/starter-kit'

export const commonExtensions = [StarterKit]

export const commonWrapperStyles: SystemStyleObject = {
  fontSize: '18px',
  lineHeight: '24px',

  '.ProseMirror': {
    '& :is(ul,ol)': {
      paddingLeft: '16px',
    },
  },
}
