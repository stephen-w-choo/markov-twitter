import React from "react";
import FadeIn from 'react-fade-in';
import { Alert, AlertIcon } from "@chakra-ui/react";
import LoadingBar from "../components/LoadingBar";

function StatusBox(props) {
  return(
    <div className="loading-box">
      <FadeIn>
        {props.status.loading &&
          <LoadingBar>
            {props.status.message}
          </LoadingBar>
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
