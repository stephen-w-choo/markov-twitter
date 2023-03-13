import React from 'react'
import { Alert, Box, Spinner } from '@chakra-ui/react'


export default function LoadingBar({children}) {
  return (
    <Alert
      status='info'
      variant='subtle'
      alignItems='center'
      textAlign={'left'}
      justifyContent={'center'}
      flexWrap={'wrap'}
      p={4}
    >
      <Spinner
        as="span"
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='lg'
        m={4}
      />
      <Box>
        {children}
      </Box>
    </Alert>
  )
}
