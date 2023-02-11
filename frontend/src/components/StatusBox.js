import React, { useState } from "react";
import FadeIn from 'react-fade-in';
import { GridLoader } from 'react-spinners';


function StatusBox(props) {
  return(
    <div className="loading-box">
      <FadeIn>
        {props.status.loading && <GridLoader color="#36d7b7" />}
        <p>{props.status.message}</p>
      </FadeIn>
    </div>
  )
}

export default StatusBox;
