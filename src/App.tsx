import { useState } from 'react'
import { RichTextEditor, RichTextViewer } from './RichText'
import { Button, Tag } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'

function App() {
  const [content, setContent] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false)
  const [valid, setValid] = useState(true)

  const handleValidate = () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<RichTextViewer content={content} />)
    requestIdleCallback(() => {
      const el = document.querySelector('div#render-template')
      if (!el) return
      el.append(div)
      const isBigger = el.scrollHeight > 273
      if (isBigger) {
        setValid(false)
      } else {
        setValid(true)
      }
      el.innerHTML = ''
    })
  }
  return (
    <div>
      <div id="render-template"></div>
      <Button onClick={() => setDisabled(prev => !prev)} isActive={disabled}>
        disabled
      </Button>
      <Button onClick={() => setError(prev => !prev)} isActive={error} ml="1rem">
        error
      </Button>
      <Button onClick={handleValidate} ml="1rem">
        Validate
      </Button>
      <Tag colorScheme={valid ? 'green' : 'red'}>{valid ? 'VALID' : 'INVALID'}</Tag>
      <RichTextEditor
        placeholder="Впишите краткое описание"
        limit={400}
        height="273px"
        content={content}
        error={error}
        disabled={disabled}
        onChange={setContent}
      />
      <RichTextViewer content={content} />
    </div>
  )
}

export default App
