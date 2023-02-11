import React from "react";
import FadeIn from 'react-fade-in';
import { GridLoader } from 'react-spinners';
import { Alert, AlertIcon } from "@chakra-ui/react";

function StatusBox(props) {
  return(
    <div className="loading-box">
      <FadeIn>
        {props.status.loading && <GridLoader color="#36d7b7" />}
        {props.status.loading &&
          <Alert status='info'>
            <AlertIcon />
            {props.status.message}
          </Alert>
        }
        {!props.status.loading && props.status.message &&
          <Alert status='warning'>
            <AlertIcon />
            {props.status.message}
          </Alert>
        }

      </FadeIn>
    </div>
  )
}

export default StatusBox;
