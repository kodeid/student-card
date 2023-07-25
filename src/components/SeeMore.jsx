import {useEffect, useState} from 'react'

export default function SeeMore({text}) {
  const [isMore, setIsMore] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [displayText, setDisplayText] = useState(null)

  useEffect(() => {
    if (text) {
      if (text.length >= 225) {
        setIsMore(true)
      }
      setDisplayText(text.substring(0, 225))
    }
  })

  return (
    <>
      <span>
        {isOpen ? text : displayText}
        {isMore && (
          <button onClick={() => setIsOpen(!isOpen)} className="link link-hover text-orange-500 ml-1">
            {!isOpen ? '... more' : 'less ...'}
          </button>
        )}
      </span>
    </>
  )
}