import React from "react";
import FadeIn from 'react-fade-in';
import { GridLoader } from 'react-spinners';
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";

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
          justifyContent='center'
          p={6}
          >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
              mr={10}
              position='absolute'
              left='20px'
            />
            {props.status.message}
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
