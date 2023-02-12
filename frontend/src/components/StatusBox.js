import React from "react";
import FadeIn from 'react-fade-in';
import { GridLoader } from 'react-spinners';
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";

function StatusBox(props) {
  return(
    <div className="loading-box">
      <FadeIn>
        {props.status.loading && <GridLoader color="#36d7b7" />}
        {props.status.loading &&
          <Alert
          status='info'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign={'left'}
          >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
            {props.status.message}
          </Alert>
        }
        {!props.status.loading && props.status.message &&
          <Alert
          status='warning'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
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
