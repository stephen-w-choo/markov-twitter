import React from "react";
import FadeIn from 'react-fade-in';
import { GridLoader } from 'react-spinners';
import { Alert, AlertIcon, Box, Flex, Spinner, Text } from "@chakra-ui/react";

function StatusBox(props) {
  return(
    <div className="loading-box">
      <FadeIn>
        {props.status.loading &&
          <Alert
          status='info'
          variant='subtle'
          alignItems='center'
          textAlign={'left'}
          justifyContent={'space-around'}
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
              flexShrink={0}
            />
            <Box flexGrow="1">{props.status.message}</Box>
          </Alert>
        }
        {!props.status.loading && props.status.message &&
          <Alert
          status='warning'
          variant='subtle'
          alignItems='center'
          textAlign={'left'}
          >
            <AlertIcon />
            {props.status.message}
          </Alert>
        }

      </FadeIn>
    </div>
  )
}

export default StatusBox;
