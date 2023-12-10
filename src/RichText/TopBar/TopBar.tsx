import { Button, Flex } from '@chakra-ui/react'
import { useCurrentEditor } from '@tiptap/react'

interface TopBarProps {
  disabled?: boolean
}

export const TopBar = ({ disabled }: TopBarProps) => {
  const { editor } = useCurrentEditor()

  if (!editor) return null

  return (
    <Flex
      borderTopLeftRadius="10px"
      borderTopRightRadius="10px"
      border="1px solid gray"
      borderBottomWidth="0px"
      p="12px 8px"
      gap="8px"
    >
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        isDisabled={disabled}
        variant="ghost"
        isActive={editor.isActive('bold')}
      >
        Bold
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isDisabled={disabled}
        variant="ghost"
        isActive={editor.isActive('bulletList')}
      >
        bullet list
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isDisabled={disabled}
        variant="ghost"
        isActive={editor.isActive('orderedList')}
      >
        ordered list
      </Button>
    </Flex>
  )
}
