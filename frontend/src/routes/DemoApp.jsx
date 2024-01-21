import React, { useState } from "react";
import ModelDisplayArea from '../sections/ModelDisplayArea';
import TweetDisplayArea from '../sections/TweetDisplayArea';
import { useNavigate} from 'react-router-dom'


function DemoApp({demoModel}){
  const navigate = useNavigate()
  
  const [tweets, setTweets] = useState([])
  
  const [status, setStatus] = useState({
    message: null,
    loading: false,
    show: false,
    error: false,
  })

  const userModel = demoModel

  const [tweetKey, setTweetKey] = useState(0)

  React.useEffect(() => { // sets a key to the tweets to force remounting of the tweet display area
    setTweetKey(tweetKey + 1) // this is a bit of a hacky way to force the tweet display area to remount and trigger the fadein animation
  }, [tweets])

  const generateTweets = (event) => {
    // setStatus({
    //   loading: true,
    //   message: "Generating tweets...",
    //   show: true,
    //   error: false
    // })
    // generateTweetsFromDemoModel()
    // .then( (response) => {
    //   setStatus({
    //     message: null,
    //     loading: false,
    //     show: false,
    //     error: false,
    //   })
    //   setTweets(response.tweets)
    // })
    // .catch( (error) => {
    //   setTweets([])
    //   setStatus({
    //     message: "Error generating tweets",
    //     loading: false,
    //     show: false,
    //     error: true
    //   })
    // })
  }

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportToJson = e => {
    e.preventDefault()
    downloadFile({
      data: JSON.stringify(userModel),
      fileName: `${userModel.userHandle}_model.json`,
      fileType: 'text/json',
    })
  }

  return (
    <div>
      { userModel.user &&
        <ModelDisplayArea
          userModel={userModel}
          setTweets={setTweets}
          generateTweets={generateTweets}
          reset={ () => {
            navigate('/')
          }}
          status={status}
          exportToJson={exportToJson}
        />
      }
      <TweetDisplayArea 
        key={tweetKey} 
        tweets={tweets} 
        userModel={userModel} 
        generateTweets={generateTweets}
      />
    </div>
  );
}

export default DemoApp;
