import { Text } from '@chakra-ui/react'
import { useCurrentEditor } from '@tiptap/react'

interface CharCountProps {
  limit: number
}

export const CharCount = ({ limit }: CharCountProps) => {
  const { editor } = useCurrentEditor()

  if (!editor) return null

  const currentCharCount = editor?.storage?.characterCount?.characters()

  return (
    <Text fontSize="xs" color="gray" as="span">
      {currentCharCount}/{limit}
    </Text>
  )
}
