import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'


function InactivePopUp() {
  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true})
  const cancelRef = React.useRef()

  return (
    <React.Fragment>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              A note from the developer
            </AlertDialogHeader>

            <AlertDialogBody>
            As of May 2023, Twitter has changed it's API, and this small hobby project is now prohibitively expensive to run. I've removed my API key and the app backend will no longer work.
            <br /> <br />
            I've left the web frontend running for now: this was one of my first passion projects that I had a lot of fun with, and I'm still proud of what I managed to do with my skills at the time.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </React.Fragment>
  )
}

export default InactivePopUp