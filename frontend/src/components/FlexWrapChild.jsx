import React from 'react'
import { Card } from '@chakra-ui/react'

export default function FlexWrapChild({children}) {
  return (
    <Card m={2}
      minW="30ch"
      maxH="40ch"
      flexGrow={1}
      flexBasis={"30ch"}
      flexShrink={1}
      overflow="hidden"
      variant="outline"
    >
      {children}
    </Card>
  )
}
