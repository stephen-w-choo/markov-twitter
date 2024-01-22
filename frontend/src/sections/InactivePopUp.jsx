import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'


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
            As of May 2023, Twitter has changed it's API, and this small hobby 
            project is now prohibitively expensive to run. I've removed my API 
            key and the app backend will no longer be able to generate new models. 
            <br /> <br />
            If you're interested in seeing what the app used to look like, I've 
            created a demo page with one of the previous models I created.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Flex w="100%" justifyContent="space-between">
                <Link to={"demo"}>
                  <Button colorScheme="teal" p={4}>
                    View demo
                  </Button>
                </Link>
                <Button ref={cancelRef} onClick={onClose}>
                  Continue
                </Button>
              </Flex>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </React.Fragment>
  )
}

export default InactivePopUp