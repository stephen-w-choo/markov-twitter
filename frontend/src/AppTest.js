import './css/App.css';
import './css/fonts.css';
import './css/start.css';
import './css/model.css';
import './css/tweet.css';
import React, { useState } from "react";
import { Button, ChakraProvider, Container, FormLabel, Input } from '@chakra-ui/react'

import TitleBar from './components/TitleBar';
import ModelDisplayArea from './sections/ModelDisplayArea';
import StartScreen from './components/StartScreen';
import TweetDisplayArea from './sections/TweetDisplayArea';

// this file WILL eventually be refactored
// I sincerely apologise for this mess


function App() {

  const primaryColor = "#61777f"

  const [status, setStatus] = useState({
    message: null,
    loading: false,
    show: false,
    error: false,
  })

  const [tweets, setTweets] = useState([])

  // const [currentScreen, setCurrentScreen] = useState("start")

  const [userModel, setUserModel] = useState({
    "user": "Stephen Sclafani",
    "userHandle": "Stephen",
    "userProfilePicture": "https://pbs.twimg.com/profile_images/3299437025/200b8291a5fd39f5e3c3894f4b014526_400x400.jpeg",
    "userMetrics": {
        "followers_count": 3813,
        "following_count": 268,
        "listed_count": 196,
        "tweet_count": 862
    },
    "userJoined": "Mar 2007",
    "currentModel": "{\"state_size\": 2, \"chain\": \"[[[\\\"___BEGIN__\\\", \\\"___BEGIN__\\\"], {\\\"@TheStalwart\\\": 1, \\\"You\\\": 1, \\\"It's\\\": 1, \\\"There's\\\": 1, \\\"Looks\\\": 1, \\\"The\\\": 2, \\\"It\\\": 1, \\\"Reported\\\": 1, \\\"No\\\": 2, \\\"I\\\": 2, \\\"I've\\\": 1, \\\"@chrismaddern\\\": 1, \\\"Periscope\\\": 1, \\\"New\\\": 1, \\\"All\\\": 1, \\\"But\\\": 1, \\\"Waiting\\\": 1, \\\"Haven't\\\": 1, \\\"This\\\": 1, \\\"#lazy\\\": 1}], [[\\\"___BEGIN__\\\", \\\"@TheStalwart\\\"], {\\\"Five\\\": 1}], [[\\\"@TheStalwart\\\", \\\"Five\\\"], {\\\"of\\\": 1}], [[\\\"Five\\\", \\\"of\\\"], {\\\"my\\\": 1}], [[\\\"of\\\", \\\"my\\\"], {\\\"reports\\\": 1}], [[\\\"my\\\", \\\"reports\\\"], {\\\"were\\\": 1}], [[\\\"reports\\\", \\\"were\\\"], {\\\"Oculus\\\": 1}], [[\\\"were\\\", \\\"Oculus\\\"], {\\\"related\\\": 1}], [[\\\"Oculus\\\", \\\"related\\\"], {\\\"but\\\": 1}], [[\\\"related\\\", \\\"but\\\"], {\\\"I\\\": 1}], [[\\\"but\\\", \\\"I\\\"], {\\\"missed\\\": 1, \\\"don't\\\": 1}], [[\\\"I\\\", \\\"missed\\\"], {\\\"this\\\": 1}], [[\\\"missed\\\", \\\"this\\\"], {\\\"one.\\\": 1}], [[\\\"this\\\", \\\"one.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"You\\\"], {\\\"got\\\": 1}], [[\\\"You\\\", \\\"got\\\"], {\\\"included\\\": 1}], [[\\\"got\\\", \\\"included\\\"], {\\\"somehow./n.@phwd\\\": 1}], [[\\\"included\\\", \\\"somehow./n.@phwd\\\"], {\\\"I'll\\\": 1}], [[\\\"somehow./n.@phwd\\\", \\\"I'll\\\"], {\\\"try\\\": 1}], [[\\\"I'll\\\", \\\"try\\\"], {\\\"to\\\": 1}], [[\\\"try\\\", \\\"to\\\"], {\\\"stop\\\": 1}], [[\\\"to\\\", \\\"stop\\\"], {\\\"being\\\": 1}], [[\\\"stop\\\", \\\"being\\\"], {\\\"lazy\\\": 1}], [[\\\"being\\\", \\\"lazy\\\"], {\\\"and\\\": 1}], [[\\\"lazy\\\", \\\"and\\\"], {\\\"do\\\": 1}], [[\\\"and\\\", \\\"do\\\"], {\\\"a\\\": 1}], [[\\\"do\\\", \\\"a\\\"], {\\\"writeup\\\": 1}], [[\\\"a\\\", \\\"writeup\\\"], {\\\"on\\\": 1}], [[\\\"writeup\\\", \\\"on\\\"], {\\\"this\\\": 1}], [[\\\"on\\\", \\\"this\\\"], {\\\"sometime\\\": 1}], [[\\\"this\\\", \\\"sometime\\\"], {\\\"soon.\\\": 1}], [[\\\"sometime\\\", \\\"soon.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"It's\\\"], {\\\"always\\\": 1}], [[\\\"It's\\\", \\\"always\\\"], {\\\"high\\\": 1}], [[\\\"always\\\", \\\"high\\\"], {\\\"noon\\\": 1}], [[\\\"high\\\", \\\"noon\\\"], {\\\"somewhere./n@agarwal\\\": 1}], [[\\\"noon\\\", \\\"somewhere./n@agarwal\\\"], {\\\"The\\\": 1}], [[\\\"somewhere./n@agarwal\\\", \\\"The\\\"], {\\\"owners\\\": 1}], [[\\\"The\\\", \\\"owners\\\"], {\\\"closed\\\": 1}], [[\\\"owners\\\", \\\"closed\\\"], {\\\"the\\\": 1}], [[\\\"closed\\\", \\\"the\\\"], {\\\"shop\\\": 1}], [[\\\"the\\\", \\\"shop\\\"], {\\\"and\\\": 1}], [[\\\"shop\\\", \\\"and\\\"], {\\\"retired\\\": 1}], [[\\\"and\\\", \\\"retired\\\"], {\\\"last\\\": 1}], [[\\\"retired\\\", \\\"last\\\"], {\\\"year\\\": 1}], [[\\\"last\\\", \\\"year\\\"], {\\\"Facebook\\\": 1, \\\"from\\\": 1}], [[\\\"year\\\", \\\"Facebook\\\"], {\\\"owns\\\": 1}], [[\\\"Facebook\\\", \\\"owns\\\"], {\\\"whatsapp./n@Viss\\\": 1}], [[\\\"owns\\\", \\\"whatsapp./n@Viss\\\"], {\\\"Facebook\\\": 1}], [[\\\"whatsapp./n@Viss\\\", \\\"Facebook\\\"], {\\\"has\\\": 1}], [[\\\"Facebook\\\", \\\"has\\\"], {\\\"no\\\": 1}], [[\\\"has\\\", \\\"no\\\"], {\\\"advertising\\\": 1}], [[\\\"no\\\", \\\"advertising\\\"], {\\\"product\\\": 1}], [[\\\"advertising\\\", \\\"product\\\"], {\\\"where\\\": 1}], [[\\\"product\\\", \\\"where\\\"], {\\\"it\\\": 1}], [[\\\"where\\\", \\\"it\\\"], {\\\"sells\\\": 1}], [[\\\"it\\\", \\\"sells\\\"], {\\\"such\\\": 1}], [[\\\"sells\\\", \\\"such\\\"], {\\\"data./n@mmihaljevic\\\": 1}], [[\\\"such\\\", \\\"data./n@mmihaljevic\\\"], {\\\"@NealPoole\\\": 1}], [[\\\"data./n@mmihaljevic\\\", \\\"@NealPoole\\\"], {\\\"If\\\": 1}], [[\\\"@NealPoole\\\", \\\"If\\\"], {\\\"you\\\": 1}], [[\\\"If\\\", \\\"you\\\"], {\\\"have\\\": 1}], [[\\\"you\\\", \\\"have\\\"], {\\\"an\\\": 1}], [[\\\"have\\\", \\\"an\\\"], {\\\"united\\\": 1}], [[\\\"an\\\", \\\"united\\\"], {\\\"card\\\": 1}], [[\\\"united\\\", \\\"card\\\"], {\\\"you\\\": 1}], [[\\\"card\\\", \\\"you\\\"], {\\\"can\\\": 1}], [[\\\"you\\\", \\\"can\\\"], {\\\"also\\\": 1}], [[\\\"can\\\", \\\"also\\\"], {\\\"convert\\\": 1}], [[\\\"also\\\", \\\"convert\\\"], {\\\"miles\\\": 1}], [[\\\"convert\\\", \\\"miles\\\"], {\\\"to\\\": 1}], [[\\\"miles\\\", \\\"to\\\"], {\\\"gift\\\": 1}], [[\\\"to\\\", \\\"gift\\\"], {\\\"cards\\\": 1}], [[\\\"gift\\\", \\\"cards\\\"], {\\\"but\\\": 1}], [[\\\"cards\\\", \\\"but\\\"], {\\\"the\\\": 1}], [[\\\"but\\\", \\\"the\\\"], {\\\"exchange\\\": 1}], [[\\\"the\\\", \\\"exchange\\\"], {\\\"rate\\\": 1}], [[\\\"exchange\\\", \\\"rate\\\"], {\\\"is\\\": 1}], [[\\\"rate\\\", \\\"is\\\"], {\\\"pretty\\\": 1}], [[\\\"is\\\", \\\"pretty\\\"], {\\\"bad./n@NealPoole\\\": 1}], [[\\\"pretty\\\", \\\"bad./n@NealPoole\\\"], {\\\"@mmihaljevic\\\": 1}], [[\\\"bad./n@NealPoole\\\", \\\"@mmihaljevic\\\"], {\\\"The\\\": 1}], [[\\\"@mmihaljevic\\\", \\\"The\\\"], {\\\"tax\\\": 1}], [[\\\"The\\\", \\\"tax\\\"], {\\\"is\\\": 1}], [[\\\"tax\\\", \\\"is\\\"], {\\\"a\\\": 1}], [[\\\"is\\\", \\\"a\\\"], {\\\"killer\\\": 1}], [[\\\"a\\\", \\\"killer\\\"], {\\\"unless\\\": 1}], [[\\\"killer\\\", \\\"unless\\\"], {\\\"you\\\": 1}], [[\\\"unless\\\", \\\"you\\\"], {\\\"fly\\\": 1}], [[\\\"you\\\", \\\"fly\\\"], {\\\"a\\\": 1}], [[\\\"fly\\\", \\\"a\\\"], {\\\"lot.\\\": 1}], [[\\\"a\\\", \\\"lot.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"There's\\\"], {\\\"some\\\": 1}], [[\\\"There's\\\", \\\"some\\\"], {\\\"tricks\\\": 1}], [[\\\"some\\\", \\\"tricks\\\"], {\\\"to\\\": 1}], [[\\\"tricks\\\", \\\"to\\\"], {\\\"get\\\": 1}], [[\\\"to\\\", \\\"get\\\"], {\\\"around\\\": 1}], [[\\\"get\\\", \\\"around\\\"], {\\\"the\\\": 1}], [[\\\"around\\\", \\\"the\\\"], {\\\"expiration:\\\": 1, \\\"same\\\": 1}], [[\\\"the\\\", \\\"expiration:\\\"], {\\\"Xbox\\\": 1}], [[\\\"expiration:\\\", \\\"Xbox\\\"], {\\\"Live\\\": 1}], [[\\\"Xbox\\\", \\\"Live\\\"], {\\\"is\\\": 1}], [[\\\"Live\\\", \\\"is\\\"], {\\\"down./n@Cvinciguerra1\\\": 1}], [[\\\"is\\\", \\\"down./n@Cvinciguerra1\\\"], {\\\"@5dogstexas\\\": 1}], [[\\\"down./n@Cvinciguerra1\\\", \\\"@5dogstexas\\\"], {\\\"A\\\": 1}], [[\\\"@5dogstexas\\\", \\\"A\\\"], {\\\"bunch\\\": 1}], [[\\\"A\\\", \\\"bunch\\\"], {\\\"of\\\": 1}], [[\\\"bunch\\\", \\\"of\\\"], {\\\"stocks\\\": 1}], [[\\\"of\\\", \\\"stocks\\\"], {\\\"weren't\\\": 1}], [[\\\"stocks\\\", \\\"weren't\\\"], {\\\"getting\\\": 1}], [[\\\"weren't\\\", \\\"getting\\\"], {\\\"new\\\": 1}], [[\\\"getting\\\", \\\"new\\\"], {\\\"data\\\": 1}], [[\\\"new\\\", \\\"data\\\"], {\\\"on\\\": 1}], [[\\\"data\\\", \\\"on\\\"], {\\\"etrade.\\\": 1}], [[\\\"on\\\", \\\"etrade.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"Looks\\\"], {\\\"to\\\": 1}], [[\\\"Looks\\\", \\\"to\\\"], {\\\"be\\\": 1}], [[\\\"to\\\", \\\"be\\\"], {\\\"fixed\\\": 1, \\\"printed,\\\": 1, \\\"a\\\": 1}], [[\\\"be\\\", \\\"fixed\\\"], {\\\"now\\\": 1}], [[\\\"fixed\\\", \\\"now\\\"], {\\\"for\\\": 1}], [[\\\"now\\\", \\\"for\\\"], {\\\"me./n@dhh\\\": 1}], [[\\\"for\\\", \\\"me./n@dhh\\\"], {\\\"Twitter\\\": 1}], [[\\\"me./n@dhh\\\", \\\"Twitter\\\"], {\\\"doesn't\\\": 1}], [[\\\"Twitter\\\", \\\"doesn't\\\"], {\\\"give\\\": 1}], [[\\\"doesn't\\\", \\\"give\\\"], {\\\"this\\\": 1}], [[\\\"give\\\", \\\"this\\\"], {\\\"option\\\": 1}], [[\\\"this\\\", \\\"option\\\"], {\\\"to\\\": 1}], [[\\\"option\\\", \\\"to\\\"], {\\\"verified\\\": 1}], [[\\\"to\\\", \\\"verified\\\"], {\\\"users\\\": 1}], [[\\\"verified\\\", \\\"users\\\"], {\\\"for\\\": 1}], [[\\\"users\\\", \\\"for\\\"], {\\\"some\\\": 1}], [[\\\"for\\\", \\\"some\\\"], {\\\"reason./n@dhh\\\": 1}], [[\\\"some\\\", \\\"reason./n@dhh\\\"], {\\\"Being\\\": 1}], [[\\\"reason./n@dhh\\\", \\\"Being\\\"], {\\\"a\\\": 1}], [[\\\"Being\\\", \\\"a\\\"], {\\\"verified\\\": 1}], [[\\\"a\\\", \\\"verified\\\"], {\\\"user\\\": 1}], [[\\\"verified\\\", \\\"user\\\"], {\\\"actually\\\": 1}], [[\\\"user\\\", \\\"actually\\\"], {\\\"limits\\\": 1}], [[\\\"actually\\\", \\\"limits\\\"], {\\\"your\\\": 1}], [[\\\"limits\\\", \\\"your\\\"], {\\\"options\\\": 1}], [[\\\"your\\\", \\\"options\\\"], {\\\"on\\\": 1}], [[\\\"options\\\", \\\"on\\\"], {\\\"this.\\\": 1}], [[\\\"on\\\", \\\"this.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"The\\\"], {\\\"penalty\\\": 1, \\\"same\\\": 1}], [[\\\"The\\\", \\\"penalty\\\"], {\\\"is\\\": 1}], [[\\\"penalty\\\", \\\"is\\\"], {\\\"added\\\": 1}], [[\\\"is\\\", \\\"added\\\"], {\\\"even\\\": 1}], [[\\\"added\\\", \\\"even\\\"], {\\\"if\\\": 1}], [[\\\"even\\\", \\\"if\\\"], {\\\"you\\\": 1}], [[\\\"if\\\", \\\"you\\\"], {\\\"aren't\\\": 1, \\\"use\\\": 1}], [[\\\"you\\\", \\\"aren't\\\"], {\\\"the\\\": 1}], [[\\\"aren't\\\", \\\"the\\\"], {\\\"submitter./n@fransrosen\\\": 1}], [[\\\"the\\\", \\\"submitter./n@fransrosen\\\"], {\\\"FYI,\\\": 1}], [[\\\"submitter./n@fransrosen\\\", \\\"FYI,\\\"], {\\\"never\\\": 1}], [[\\\"FYI,\\\", \\\"never\\\"], {\\\"link\\\": 1}], [[\\\"never\\\", \\\"link\\\"], {\\\"to\\\": 1}], [[\\\"link\\\", \\\"to\\\"], {\\\"a\\\": 1}], [[\\\"to\\\", \\\"a\\\"], {\\\"HN\\\": 1}], [[\\\"a\\\", \\\"HN\\\"], {\\\"submission.\\\": 1}], [[\\\"HN\\\", \\\"submission.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"It\\\"], {\\\"penalizes\\\": 1}], [[\\\"It\\\", \\\"penalizes\\\"], {\\\"you\\\": 1}], [[\\\"penalizes\\\", \\\"you\\\"], {\\\"for\\\": 1}], [[\\\"you\\\", \\\"for\\\"], {\\\"votes\\\": 1}], [[\\\"for\\\", \\\"votes\\\"], {\\\"made\\\": 1}], [[\\\"votes\\\", \\\"made\\\"], {\\\"directly\\\": 1}], [[\\\"made\\\", \\\"directly\\\"], {\\\"from\\\": 1}], [[\\\"directly\\\", \\\"from\\\"], {\\\"the\\\": 1}], [[\\\"from\\\", \\\"the\\\"], {\\\"URL./n@GlennF\\\": 1}], [[\\\"the\\\", \\\"URL./n@GlennF\\\"], {\\\"Oh\\\": 1}], [[\\\"URL./n@GlennF\\\", \\\"Oh\\\"], {\\\"well,\\\": 1}], [[\\\"Oh\\\", \\\"well,\\\"], {\\\"I\\\": 1}], [[\\\"well,\\\", \\\"I\\\"], {\\\"wonder\\\": 1}], [[\\\"I\\\", \\\"wonder\\\"], {\\\"if\\\": 1, \\\"how\\\": 1}], [[\\\"wonder\\\", \\\"if\\\"], {\\\"it's\\\": 1}], [[\\\"if\\\", \\\"it's\\\"], {\\\"intentional\\\": 1}], [[\\\"it's\\\", \\\"intentional\\\"], {\\\"or\\\": 1}], [[\\\"intentional\\\", \\\"or\\\"], {\\\"a\\\": 1}], [[\\\"or\\\", \\\"a\\\"], {\\\"bug./n@GlennF\\\": 1}], [[\\\"a\\\", \\\"bug./n@GlennF\\\"], {\\\"Weird,\\\": 1}], [[\\\"bug./n@GlennF\\\", \\\"Weird,\\\"], {\\\"what\\\": 1}], [[\\\"Weird,\\\", \\\"what\\\"], {\\\"happens\\\": 1}], [[\\\"what\\\", \\\"happens\\\"], {\\\"if\\\": 1}], [[\\\"happens\\\", \\\"if\\\"], {\\\"you\\\": 1}], [[\\\"you\\\", \\\"use\\\"], {\\\"the\\\": 1, \\\"their\\\": 1}], [[\\\"use\\\", \\\"the\\\"], {\\\"link\\\": 1}], [[\\\"the\\\", \\\"link\\\"], {\\\"in\\\": 1}], [[\\\"link\\\", \\\"in\\\"], {\\\"my\\\": 1}], [[\\\"in\\\", \\\"my\\\"], {\\\"first\\\": 1}], [[\\\"my\\\", \\\"first\\\"], {\\\"tweet?\\\": 1}], [[\\\"first\\\", \\\"tweet?\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"Reported\\\"], {\\\"around\\\": 1}], [[\\\"Reported\\\", \\\"around\\\"], {\\\"the\\\": 1}], [[\\\"the\\\", \\\"same\\\"], {\\\"time\\\": 1}], [[\\\"same\\\", \\\"time\\\"], {\\\"as\\\": 1}], [[\\\"time\\\", \\\"as\\\"], {\\\"@psifertex.\\\": 1}], [[\\\"as\\\", \\\"@psifertex.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"No\\\"], {\\\"opportunity\\\": 1, \\\"more\\\": 1}], [[\\\"No\\\", \\\"opportunity\\\"], {\\\"to\\\": 1}], [[\\\"opportunity\\\", \\\"to\\\"], {\\\"pick\\\": 1}], [[\\\"to\\\", \\\"pick\\\"], {\\\"apart\\\": 1}], [[\\\"pick\\\", \\\"apart\\\"], {\\\"each\\\": 1}], [[\\\"apart\\\", \\\"each\\\"], {\\\"episode./n@ErrataRob\\\": 1}], [[\\\"each\\\", \\\"episode./n@ErrataRob\\\"], {\\\"Especially\\\": 1}], [[\\\"episode./n@ErrataRob\\\", \\\"Especially\\\"], {\\\"with\\\": 1}], [[\\\"Especially\\\", \\\"with\\\"], {\\\"Daenerys./n@FiloSottile\\\": 1}], [[\\\"with\\\", \\\"Daenerys./n@FiloSottile\\\"], {\\\"@SwiftOnSecurity\\\": 1}], [[\\\"Daenerys./n@FiloSottile\\\", \\\"@SwiftOnSecurity\\\"], {\\\"@homakov\\\": 1}], [[\\\"@SwiftOnSecurity\\\", \\\"@homakov\\\"], {\\\"Need\\\": 1}], [[\\\"@homakov\\\", \\\"Need\\\"], {\\\"to\\\": 1}], [[\\\"Need\\\", \\\"to\\\"], {\\\"2x\\\": 1}], [[\\\"to\\\", \\\"2x\\\"], {\\\"that\\\": 1}], [[\\\"2x\\\", \\\"that\\\"], {\\\"hamburger\\\": 1}], [[\\\"that\\\", \\\"hamburger\\\"], {\\\"and\\\": 1}], [[\\\"hamburger\\\", \\\"and\\\"], {\\\"add\\\": 1}], [[\\\"and\\\", \\\"add\\\"], {\\\"some\\\": 1}], [[\\\"add\\\", \\\"some\\\"], {\\\"bacon./n@ehomakov\\\": 1}], [[\\\"some\\\", \\\"bacon./n@ehomakov\\\"], {\\\"It's\\\": 1}], [[\\\"bacon./n@ehomakov\\\", \\\"It's\\\"], {\\\"getting\\\": 1}], [[\\\"It's\\\", \\\"getting\\\"], {\\\"good\\\": 1}], [[\\\"getting\\\", \\\"good\\\"], {\\\"reviews./n@homakov\\\": 1}], [[\\\"good\\\", \\\"reviews./n@homakov\\\"], {\\\"@thegrugq\\\": 1}], [[\\\"reviews./n@homakov\\\", \\\"@thegrugq\\\"], {\\\"Or\\\": 1}], [[\\\"@thegrugq\\\", \\\"Or\\\"], {\\\"go\\\": 1}], [[\\\"Or\\\", \\\"go\\\"], {\\\"do\\\": 1}], [[\\\"go\\\", \\\"do\\\"], {\\\"consulting./n@homakov\\\": 1}], [[\\\"do\\\", \\\"consulting./n@homakov\\\"], {\\\"@thegrugq\\\": 1}], [[\\\"consulting./n@homakov\\\", \\\"@thegrugq\\\"], {\\\"Yeah,\\\": 1}], [[\\\"@thegrugq\\\", \\\"Yeah,\\\"], {\\\"the\\\": 1}], [[\\\"Yeah,\\\", \\\"the\\\"], {\\\"end\\\": 1}], [[\\\"the\\\", \\\"end\\\"], {\\\"game\\\": 1}], [[\\\"end\\\", \\\"game\\\"], {\\\"for\\\": 1}], [[\\\"game\\\", \\\"for\\\"], {\\\"bounties\\\": 1}], [[\\\"for\\\", \\\"bounties\\\"], {\\\"is\\\": 1}], [[\\\"bounties\\\", \\\"is\\\"], {\\\"for\\\": 1}], [[\\\"is\\\", \\\"for\\\"], {\\\"someone\\\": 1}], [[\\\"for\\\", \\\"someone\\\"], {\\\"to\\\": 1}], [[\\\"someone\\\", \\\"to\\\"], {\\\"give\\\": 1}], [[\\\"to\\\", \\\"give\\\"], {\\\"you\\\": 1}], [[\\\"give\\\", \\\"you\\\"], {\\\"a\\\": 1}], [[\\\"you\\\", \\\"a\\\"], {\\\"full\\\": 1}], [[\\\"a\\\", \\\"full\\\"], {\\\"time\\\": 1}], [[\\\"full\\\", \\\"time\\\"], {\\\"job./n@homakov\\\": 1}], [[\\\"time\\\", \\\"job./n@homakov\\\"], {\\\"@thegrugq\\\": 1}], [[\\\"job./n@homakov\\\", \\\"@thegrugq\\\"], {\\\"It's\\\": 1}], [[\\\"@thegrugq\\\", \\\"It's\\\"], {\\\"not\\\": 1}], [[\\\"It's\\\", \\\"not\\\"], {\\\"repeatable./n@homakov\\\": 1}], [[\\\"not\\\", \\\"repeatable./n@homakov\\\"], {\\\"@thegrugq\\\": 1}], [[\\\"repeatable./n@homakov\\\", \\\"@thegrugq\\\"], {\\\"Basically\\\": 1}], [[\\\"@thegrugq\\\", \\\"Basically\\\"], {\\\"only\\\": 1}], [[\\\"Basically\\\", \\\"only\\\"], {\\\"Facebook.\\\": 1}], [[\\\"only\\\", \\\"Facebook.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"I\\\"], {\\\"made\\\": 1, \\\"wonder\\\": 1}], [[\\\"I\\\", \\\"made\\\"], {\\\"$40k\\\": 1}], [[\\\"made\\\", \\\"$40k\\\"], {\\\"in\\\": 1}], [[\\\"$40k\\\", \\\"in\\\"], {\\\"one\\\": 1}], [[\\\"in\\\", \\\"one\\\"], {\\\"month\\\": 1}], [[\\\"one\\\", \\\"month\\\"], {\\\"last\\\": 1}], [[\\\"month\\\", \\\"last\\\"], {\\\"year\\\": 1}], [[\\\"year\\\", \\\"from\\\"], {\\\"Facebook\\\": 1}], [[\\\"from\\\", \\\"Facebook\\\"], {\\\"but\\\": 1}], [[\\\"Facebook\\\", \\\"but\\\"], {\\\"that's\\\": 1}], [[\\\"but\\\", \\\"that's\\\"], {\\\"like\\\": 1}], [[\\\"that's\\\", \\\"like\\\"], {\\\"hitting\\\": 1}], [[\\\"like\\\", \\\"hitting\\\"], {\\\"the\\\": 1}], [[\\\"hitting\\\", \\\"the\\\"], {\\\"lottery./n@thegrugq\\\": 1}], [[\\\"the\\\", \\\"lottery./n@thegrugq\\\"], {\\\"@homakov\\\": 1}], [[\\\"lottery./n@thegrugq\\\", \\\"@homakov\\\"], {\\\"Probably\\\": 1}], [[\\\"@homakov\\\", \\\"Probably\\\"], {\\\"only\\\": 1}], [[\\\"Probably\\\", \\\"only\\\"], {\\\"few\\\": 1}], [[\\\"only\\\", \\\"few\\\"], {\\\"people\\\": 1}], [[\\\"few\\\", \\\"people\\\"], {\\\"making\\\": 1}], [[\\\"people\\\", \\\"making\\\"], {\\\"anything\\\": 1}], [[\\\"making\\\", \\\"anything\\\"], {\\\"close\\\": 1}], [[\\\"anything\\\", \\\"close\\\"], {\\\"to\\\": 1}], [[\\\"close\\\", \\\"to\\\"], {\\\"$30k/month\\\": 1}], [[\\\"to\\\", \\\"$30k/month\\\"], {\\\"from\\\": 1}], [[\\\"$30k/month\\\", \\\"from\\\"], {\\\"web\\\": 1}], [[\\\"from\\\", \\\"web\\\"], {\\\"bounties./n@totally_unknown\\\": 1}], [[\\\"web\\\", \\\"bounties./n@totally_unknown\\\"], {\\\"Could\\\": 1}], [[\\\"bounties./n@totally_unknown\\\", \\\"Could\\\"], {\\\"be\\\": 1}], [[\\\"Could\\\", \\\"be\\\"], {\\\"one\\\": 1}], [[\\\"be\\\", \\\"one\\\"], {\\\"of\\\": 1}], [[\\\"one\\\", \\\"of\\\"], {\\\"those\\\": 1}], [[\\\"of\\\", \\\"those\\\"], {\\\"things\\\": 1, \\\"followers\\\": 1}], [[\\\"those\\\", \\\"things\\\"], {\\\"that\\\": 1}], [[\\\"things\\\", \\\"that\\\"], {\\\"people\\\": 1}], [[\\\"that\\\", \\\"people\\\"], {\\\"just\\\": 1}], [[\\\"people\\\", \\\"just\\\"], {\\\"copycat./n@totally_unknown\\\": 1}], [[\\\"just\\\", \\\"copycat./n@totally_unknown\\\"], {\\\"I\\\": 1}], [[\\\"copycat./n@totally_unknown\\\", \\\"I\\\"], {\\\"don't\\\": 1}], [[\\\"I\\\", \\\"don't\\\"], {\\\"either\\\": 1, \\\"use\\\": 1}], [[\\\"don't\\\", \\\"either\\\"], {\\\"but\\\": 1}], [[\\\"either\\\", \\\"but\\\"], {\\\"I\\\": 1}], [[\\\"don't\\\", \\\"use\\\"], {\\\"Instagram\\\": 1}], [[\\\"use\\\", \\\"Instagram\\\"], {\\\"much\\\": 1}], [[\\\"Instagram\\\", \\\"much\\\"], {\\\"at\\\": 1}], [[\\\"much\\\", \\\"at\\\"], {\\\"all.\\\": 1}], [[\\\"at\\\", \\\"all.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"I've\\\"], {\\\"just\\\": 1}], [[\\\"I've\\\", \\\"just\\\"], {\\\"read\\\": 1}], [[\\\"just\\\", \\\"read\\\"], {\\\"about\\\": 1}], [[\\\"read\\\", \\\"about\\\"], {\\\"it./n@totally_unknown\\\": 1}], [[\\\"about\\\", \\\"it./n@totally_unknown\\\"], {\\\"People\\\": 1}], [[\\\"it./n@totally_unknown\\\", \\\"People\\\"], {\\\"hashtag\\\": 1}], [[\\\"People\\\", \\\"hashtag\\\"], {\\\"surf\\\": 1}], [[\\\"hashtag\\\", \\\"surf\\\"], {\\\"so\\\": 1}], [[\\\"surf\\\", \\\"so\\\"], {\\\"there\\\": 1}], [[\\\"so\\\", \\\"there\\\"], {\\\"is\\\": 1}], [[\\\"there\\\", \\\"is\\\"], {\\\"an\\\": 1}], [[\\\"is\\\", \\\"an\\\"], {\\\"incentive\\\": 1}], [[\\\"an\\\", \\\"incentive\\\"], {\\\"to\\\": 1}], [[\\\"incentive\\\", \\\"to\\\"], {\\\"spam\\\": 1}], [[\\\"to\\\", \\\"spam\\\"], {\\\"your\\\": 1}], [[\\\"spam\\\", \\\"your\\\"], {\\\"description\\\": 1}], [[\\\"your\\\", \\\"description\\\"], {\\\"with\\\": 1}], [[\\\"description\\\", \\\"with\\\"], {\\\"them./nThe\\\": 1}], [[\\\"with\\\", \\\"them./nThe\\\"], {\\\"new\\\": 1}], [[\\\"them./nThe\\\", \\\"new\\\"], {\\\"Facebook\\\": 1}], [[\\\"new\\\", \\\"Facebook\\\"], {\\\"HQ\\\": 1}], [[\\\"Facebook\\\", \\\"HQ\\\"], {\\\"has\\\": 1}], [[\\\"HQ\\\", \\\"has\\\"], {\\\"an\\\": 1}], [[\\\"has\\\", \\\"an\\\"], {\\\"office\\\": 1}], [[\\\"an\\\", \\\"office\\\"], {\\\"that's\\\": 1}], [[\\\"office\\\", \\\"that's\\\"], {\\\"also\\\": 1}], [[\\\"that's\\\", \\\"also\\\"], {\\\"a\\\": 1}], [[\\\"also\\\", \\\"a\\\"], {\\\"ball\\\": 1}], [[\\\"a\\\", \\\"ball\\\"], {\\\"pit.\\\": 1}], [[\\\"ball\\\", \\\"pit.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"@chrismaddern\\\"], {\\\"Probably\\\": 1}], [[\\\"@chrismaddern\\\", \\\"Probably\\\"], {\\\"a\\\": 1}], [[\\\"Probably\\\", \\\"a\\\"], {\\\"significant\\\": 1}], [[\\\"a\\\", \\\"significant\\\"], {\\\"amount.\\\": 1}], [[\\\"significant\\\", \\\"amount.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"Periscope\\\"], {\\\"is\\\": 1}], [[\\\"Periscope\\\", \\\"is\\\"], {\\\"already\\\": 1}], [[\\\"is\\\", \\\"already\\\"], {\\\"in\\\": 1}], [[\\\"already\\\", \\\"in\\\"], {\\\"the\\\": 1}], [[\\\"in\\\", \\\"the\\\"], {\\\"top\\\": 1, \\\"app\\\": 1, \\\"movement\\\": 1, \\\"discovery.\\\": 1}], [[\\\"the\\\", \\\"top\\\"], {\\\"100,\\\": 1, \\\"150./n@maxbulger\\\": 1}], [[\\\"top\\\", \\\"100,\\\"], {\\\"Meerkat\\\": 1}], [[\\\"100,\\\", \\\"Meerkat\\\"], {\\\"never\\\": 1}], [[\\\"Meerkat\\\", \\\"never\\\"], {\\\"cracked\\\": 1}], [[\\\"never\\\", \\\"cracked\\\"], {\\\"the\\\": 1}], [[\\\"cracked\\\", \\\"the\\\"], {\\\"top\\\": 1}], [[\\\"top\\\", \\\"150./n@maxbulger\\\"], {\\\"@chrismaddern\\\": 1}], [[\\\"150./n@maxbulger\\\", \\\"@chrismaddern\\\"], {\\\"You're\\\": 1}], [[\\\"@chrismaddern\\\", \\\"You're\\\"], {\\\"right\\\": 1}], [[\\\"You're\\\", \\\"right\\\"], {\\\"about\\\": 1}], [[\\\"right\\\", \\\"about\\\"], {\\\"that.\\\": 1}], [[\\\"about\\\", \\\"that.\\\"], {\\\"___END__\\\": 1}], [[\\\"wonder\\\", \\\"how\\\"], {\\\"much\\\": 1}], [[\\\"how\\\", \\\"much\\\"], {\\\"more\\\": 1}], [[\\\"much\\\", \\\"more\\\"], {\\\"downloads\\\": 1}], [[\\\"more\\\", \\\"downloads\\\"], {\\\"that\\\": 1}], [[\\\"downloads\\\", \\\"that\\\"], {\\\"drives\\\": 1}], [[\\\"that\\\", \\\"drives\\\"], {\\\"than\\\": 1}], [[\\\"drives\\\", \\\"than\\\"], {\\\"just\\\": 1}], [[\\\"than\\\", \\\"just\\\"], {\\\"a\\\": 1}], [[\\\"just\\\", \\\"a\\\"], {\\\"standard\\\": 1}], [[\\\"a\\\", \\\"standard\\\"], {\\\"feature./n@maxbulger\\\": 1}], [[\\\"standard\\\", \\\"feature./n@maxbulger\\\"], {\\\"@chrismaddern\\\": 1}], [[\\\"feature./n@maxbulger\\\", \\\"@chrismaddern\\\"], {\\\"Meerkat\\\": 1}], [[\\\"@chrismaddern\\\", \\\"Meerkat\\\"], {\\\"was\\\": 1}], [[\\\"Meerkat\\\", \\\"was\\\"], {\\\"featured\\\": 1}], [[\\\"was\\\", \\\"featured\\\"], {\\\"in\\\": 1}], [[\\\"featured\\\", \\\"in\\\"], {\\\"the\\\": 1}], [[\\\"the\\\", \\\"app\\\"], {\\\"store\\\": 1}], [[\\\"app\\\", \\\"store\\\"], {\\\"for\\\": 1}], [[\\\"store\\\", \\\"for\\\"], {\\\"a\\\": 1}], [[\\\"for\\\", \\\"a\\\"], {\\\"while\\\": 2, \\\"lot\\\": 1}], [[\\\"a\\\", \\\"while\\\"], {\\\"as\\\": 1, \\\"but\\\": 1}], [[\\\"while\\\", \\\"as\\\"], {\\\"well./n@dozba\\\": 1}], [[\\\"as\\\", \\\"well./n@dozba\\\"], {\\\"I\\\": 1}], [[\\\"well./n@dozba\\\", \\\"I\\\"], {\\\"live\\\": 1}], [[\\\"I\\\", \\\"live\\\"], {\\\"in\\\": 1}], [[\\\"live\\\", \\\"in\\\"], {\\\"CT\\\": 1}], [[\\\"in\\\", \\\"CT\\\"], {\\\"and\\\": 1}], [[\\\"CT\\\", \\\"and\\\"], {\\\"always\\\": 1}], [[\\\"and\\\", \\\"always\\\"], {\\\"called\\\": 1}], [[\\\"always\\\", \\\"called\\\"], {\\\"them\\\": 1}], [[\\\"called\\\", \\\"them\\\"], {\\\"sprinkles./n@homakov\\\": 1}], [[\\\"them\\\", \\\"sprinkles./n@homakov\\\"], {\\\"It's\\\": 1}], [[\\\"sprinkles./n@homakov\\\", \\\"It's\\\"], {\\\"up\\\": 1}], [[\\\"It's\\\", \\\"up\\\"], {\\\"to\\\": 1}], [[\\\"up\\\", \\\"to\\\"], {\\\"the\\\": 1}], [[\\\"to\\\", \\\"the\\\"], {\\\"banks\\\": 1, \\\"Western\\\": 1}], [[\\\"the\\\", \\\"banks\\\"], {\\\"to\\\": 1}], [[\\\"banks\\\", \\\"to\\\"], {\\\"do\\\": 1}], [[\\\"to\\\", \\\"do\\\"], {\\\"this\\\": 1}], [[\\\"do\\\", \\\"this\\\"], {\\\"and\\\": 1}], [[\\\"this\\\", \\\"and\\\"], {\\\"they\\\": 1}], [[\\\"and\\\", \\\"they\\\"], {\\\"usually\\\": 1}], [[\\\"they\\\", \\\"usually\\\"], {\\\"find\\\": 1}], [[\\\"usually\\\", \\\"find\\\"], {\\\"it\\\": 1}], [[\\\"find\\\", \\\"it\\\"], {\\\"too\\\": 1}], [[\\\"it\\\", \\\"too\\\"], {\\\"costly.\\\": 1}], [[\\\"too\\\", \\\"costly.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"New\\\"], {\\\"cards\\\": 1}], [[\\\"New\\\", \\\"cards\\\"], {\\\"have\\\": 1}], [[\\\"cards\\\", \\\"have\\\"], {\\\"to\\\": 1, \\\"been\\\": 1}], [[\\\"have\\\", \\\"to\\\"], {\\\"be\\\": 1}], [[\\\"be\\\", \\\"printed,\\\"], {\\\"mailed\\\": 1}], [[\\\"printed,\\\", \\\"mailed\\\"], {\\\"out,\\\": 1}], [[\\\"mailed\\\", \\\"out,\\\"], {\\\"etc./n@agelastic\\\": 1}], [[\\\"out,\\\", \\\"etc./n@agelastic\\\"], {\\\"This\\\": 1}], [[\\\"etc./n@agelastic\\\", \\\"This\\\"], {\\\"is\\\": 1}], [[\\\"This\\\", \\\"is\\\"], {\\\"being\\\": 1}], [[\\\"is\\\", \\\"being\\\"], {\\\"done\\\": 1}], [[\\\"being\\\", \\\"done\\\"], {\\\"in\\\": 1}], [[\\\"done\\\", \\\"in\\\"], {\\\"the\\\": 1}], [[\\\"the\\\", \\\"movement\\\"], {\\\"to\\\": 1}], [[\\\"movement\\\", \\\"to\\\"], {\\\"smart\\\": 1}], [[\\\"to\\\", \\\"smart\\\"], {\\\"cards\\\": 1}], [[\\\"smart\\\", \\\"cards\\\"], {\\\"so\\\": 1}], [[\\\"cards\\\", \\\"so\\\"], {\\\"they\\\": 1}], [[\\\"so\\\", \\\"they\\\"], {\\\"probably\\\": 1}], [[\\\"they\\\", \\\"probably\\\"], {\\\"just\\\": 1}], [[\\\"probably\\\", \\\"just\\\"], {\\\"don't\\\": 1}], [[\\\"just\\\", \\\"don't\\\"], {\\\"care\\\": 1}], [[\\\"don't\\\", \\\"care\\\"], {\\\"about\\\": 1}], [[\\\"care\\\", \\\"about\\\"], {\\\"small\\\": 1}], [[\\\"about\\\", \\\"small\\\"], {\\\"details\\\": 1}], [[\\\"small\\\", \\\"details\\\"], {\\\"like\\\": 1}], [[\\\"details\\\", \\\"like\\\"], {\\\"that\\\": 1}], [[\\\"like\\\", \\\"that\\\"], {\\\"anymore./n@agelastic\\\": 1}], [[\\\"that\\\", \\\"anymore./n@agelastic\\\"], {\\\"I\\\": 1}], [[\\\"anymore./n@agelastic\\\", \\\"I\\\"], {\\\"think\\\": 1}], [[\\\"I\\\", \\\"think\\\"], {\\\"it's\\\": 1}], [[\\\"think\\\", \\\"it's\\\"], {\\\"just\\\": 1}], [[\\\"it's\\\", \\\"just\\\"], {\\\"styling.\\\": 1}], [[\\\"just\\\", \\\"styling.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"All\\\"], {\\\"the\\\": 1}], [[\\\"All\\\", \\\"the\\\"], {\\\"unembossed\\\": 1}], [[\\\"the\\\", \\\"unembossed\\\"], {\\\"cards\\\": 1}], [[\\\"unembossed\\\", \\\"cards\\\"], {\\\"I've\\\": 1}], [[\\\"cards\\\", \\\"I've\\\"], {\\\"seen\\\": 1}], [[\\\"I've\\\", \\\"seen\\\"], {\\\"do\\\": 1}], [[\\\"seen\\\", \\\"do\\\"], {\\\"it\\\": 1}], [[\\\"do\\\", \\\"it\\\"], {\\\"that\\\": 1}], [[\\\"it\\\", \\\"that\\\"], {\\\"way.\\\": 1}], [[\\\"that\\\", \\\"way.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"But\\\"], {\\\"yeah,\\\": 1}], [[\\\"But\\\", \\\"yeah,\\\"], {\\\"seems\\\": 1}], [[\\\"yeah,\\\", \\\"seems\\\"], {\\\"to\\\": 1}], [[\\\"seems\\\", \\\"to\\\"], {\\\"be\\\": 1}], [[\\\"be\\\", \\\"a\\\"], {\\\"bit\\\": 1}], [[\\\"a\\\", \\\"bit\\\"], {\\\"less\\\": 1}], [[\\\"bit\\\", \\\"less\\\"], {\\\"secure./n@agelastic\\\": 1}], [[\\\"less\\\", \\\"secure./n@agelastic\\\"], {\\\"Unembossed\\\": 1}], [[\\\"secure./n@agelastic\\\", \\\"Unembossed\\\"], {\\\"cards\\\": 1}], [[\\\"Unembossed\\\", \\\"cards\\\"], {\\\"have\\\": 1}], [[\\\"have\\\", \\\"been\\\"], {\\\"around\\\": 1}], [[\\\"been\\\", \\\"around\\\"], {\\\"for\\\": 1}], [[\\\"around\\\", \\\"for\\\"], {\\\"a\\\": 1}], [[\\\"while\\\", \\\"but\\\"], {\\\"now\\\": 1}], [[\\\"but\\\", \\\"now\\\"], {\\\"everyone\\\": 1}], [[\\\"now\\\", \\\"everyone\\\"], {\\\"is\\\": 1}], [[\\\"everyone\\\", \\\"is\\\"], {\\\"starting\\\": 1}], [[\\\"is\\\", \\\"starting\\\"], {\\\"to\\\": 1}], [[\\\"starting\\\", \\\"to\\\"], {\\\"switch\\\": 1}], [[\\\"to\\\", \\\"switch\\\"], {\\\"to\\\": 1}], [[\\\"switch\\\", \\\"to\\\"], {\\\"them./n@agelastic\\\": 1}], [[\\\"to\\\", \\\"them./n@agelastic\\\"], {\\\"There's\\\": 1}], [[\\\"them./n@agelastic\\\", \\\"There's\\\"], {\\\"a\\\": 1}], [[\\\"There's\\\", \\\"a\\\"], {\\\"big\\\": 1}], [[\\\"a\\\", \\\"big\\\"], {\\\"push\\\": 1}], [[\\\"big\\\", \\\"push\\\"], {\\\"now\\\": 1}], [[\\\"push\\\", \\\"now\\\"], {\\\"from\\\": 1}], [[\\\"now\\\", \\\"from\\\"], {\\\"banks\\\": 1}], [[\\\"from\\\", \\\"banks\\\"], {\\\"for\\\": 1}], [[\\\"banks\\\", \\\"for\\\"], {\\\"unembossed\\\": 1}], [[\\\"for\\\", \\\"unembossed\\\"], {\\\"cards.\\\": 1}], [[\\\"unembossed\\\", \\\"cards.\\\"], {\\\"___END__\\\": 1}], [[\\\"No\\\", \\\"more\\\"], {\\\"imprints./nReported\\\": 1}], [[\\\"more\\\", \\\"imprints./nReported\\\"], {\\\"a\\\": 1}], [[\\\"imprints./nReported\\\", \\\"a\\\"], {\\\"couple\\\": 1}], [[\\\"a\\\", \\\"couple\\\"], {\\\"bugs\\\": 1}], [[\\\"couple\\\", \\\"bugs\\\"], {\\\"to\\\": 1}], [[\\\"bugs\\\", \\\"to\\\"], {\\\"the\\\": 1}], [[\\\"the\\\", \\\"Western\\\"], {\\\"Union\\\": 1}], [[\\\"Western\\\", \\\"Union\\\"], {\\\"bounty\\\": 1}], [[\\\"Union\\\", \\\"bounty\\\"], {\\\"program.\\\": 1}], [[\\\"bounty\\\", \\\"program.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"Waiting\\\"], {\\\"on\\\": 1}], [[\\\"Waiting\\\", \\\"on\\\"], {\\\"responses.\\\": 1}], [[\\\"on\\\", \\\"responses.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"Haven't\\\"], {\\\"bothered\\\": 1}], [[\\\"Haven't\\\", \\\"bothered\\\"], {\\\"with\\\": 1}], [[\\\"bothered\\\", \\\"with\\\"], {\\\"other\\\": 1}], [[\\\"with\\\", \\\"other\\\"], {\\\"programs\\\": 1}], [[\\\"other\\\", \\\"programs\\\"], {\\\"than\\\": 1}], [[\\\"programs\\\", \\\"than\\\"], {\\\"FB\\\": 1}], [[\\\"than\\\", \\\"FB\\\"], {\\\"in\\\": 1}], [[\\\"FB\\\", \\\"in\\\"], {\\\"a\\\": 1}], [[\\\"in\\\", \\\"a\\\"], {\\\"while./n@robinwauters\\\": 1}], [[\\\"a\\\", \\\"while./n@robinwauters\\\"], {\\\"#unashamed./n@homakov\\\": 1}], [[\\\"while./n@robinwauters\\\", \\\"#unashamed./n@homakov\\\"], {\\\"Did\\\": 1}], [[\\\"#unashamed./n@homakov\\\", \\\"Did\\\"], {\\\"you\\\": 1}], [[\\\"Did\\\", \\\"you\\\"], {\\\"use\\\": 1}], [[\\\"use\\\", \\\"their\\\"], {\\\"generic\\\": 1}], [[\\\"their\\\", \\\"generic\\\"], {\\\"support\\\": 1}], [[\\\"generic\\\", \\\"support\\\"], {\\\"form?\\\": 1}], [[\\\"support\\\", \\\"form?\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"This\\\"], {\\\"was\\\": 1}], [[\\\"This\\\", \\\"was\\\"], {\\\"fixed\\\": 1}], [[\\\"was\\\", \\\"fixed\\\"], {\\\"in\\\": 1}], [[\\\"fixed\\\", \\\"in\\\"], {\\\"FF\\\": 1}], [[\\\"in\\\", \\\"FF\\\"], {\\\"a\\\": 1}], [[\\\"FF\\\", \\\"a\\\"], {\\\"long\\\": 1}], [[\\\"a\\\", \\\"long\\\"], {\\\"time\\\": 1}], [[\\\"long\\\", \\\"time\\\"], {\\\"ago:\\\": 1}], [[\\\"time\\\", \\\"ago:\\\"], {\\\"There\\\": 1}], [[\\\"ago:\\\", \\\"There\\\"], {\\\"are\\\": 1}], [[\\\"There\\\", \\\"are\\\"], {\\\"nice\\\": 1}], [[\\\"are\\\", \\\"nice\\\"], {\\\"places\\\": 1}], [[\\\"nice\\\", \\\"places\\\"], {\\\"in\\\": 1}], [[\\\"places\\\", \\\"in\\\"], {\\\"SF\\\": 1}], [[\\\"in\\\", \\\"SF\\\"], {\\\"on\\\": 1}], [[\\\"SF\\\", \\\"on\\\"], {\\\"Airbnb\\\": 1}], [[\\\"on\\\", \\\"Airbnb\\\"], {\\\"for\\\": 1}], [[\\\"Airbnb\\\", \\\"for\\\"], {\\\"a\\\": 1}], [[\\\"a\\\", \\\"lot\\\"], {\\\"less\\\": 1}], [[\\\"lot\\\", \\\"less\\\"], {\\\"than\\\": 1}], [[\\\"less\\\", \\\"than\\\"], {\\\"that./n@BenedictEvans\\\": 1}], [[\\\"than\\\", \\\"that./n@BenedictEvans\\\"], {\\\"The\\\": 1}], [[\\\"that./n@BenedictEvans\\\", \\\"The\\\"], {\\\"difference\\\": 1}], [[\\\"The\\\", \\\"difference\\\"], {\\\"is\\\": 1}], [[\\\"difference\\\", \\\"is\\\"], {\\\"in\\\": 1}], [[\\\"is\\\", \\\"in\\\"], {\\\"the\\\": 1}], [[\\\"the\\\", \\\"discovery.\\\"], {\\\"___END__\\\": 1}], [[\\\"___BEGIN__\\\", \\\"#lazy\\\"], {\\\"Facebook\\\": 1}], [[\\\"#lazy\\\", \\\"Facebook\\\"], {\\\"itself\\\": 1}], [[\\\"Facebook\\\", \\\"itself\\\"], {\\\"benefited\\\": 1}], [[\\\"itself\\\", \\\"benefited\\\"], {\\\"from\\\": 1}], [[\\\"benefited\\\", \\\"from\\\"], {\\\"this\\\": 1}], [[\\\"from\\\", \\\"this\\\"], {\\\"effect\\\": 1}], [[\\\"this\\\", \\\"effect\\\"], {\\\"in\\\": 1}], [[\\\"effect\\\", \\\"in\\\"], {\\\"its\\\": 1}], [[\\\"in\\\", \\\"its\\\"], {\\\"early\\\": 1}], [[\\\"its\\\", \\\"early\\\"], {\\\"years.\\\": 1}], [[\\\"early\\\", \\\"years.\\\"], {\\\"___END__\\\": 1}], [[\\\"The\\\", \\\"same\\\"], {\\\"forces\\\": 1}], [[\\\"same\\\", \\\"forces\\\"], {\\\"that\\\": 1}], [[\\\"forces\\\", \\\"that\\\"], {\\\"kept\\\": 1}], [[\\\"that\\\", \\\"kept\\\"], {\\\"it\\\": 1}], [[\\\"kept\\\", \\\"it\\\"], {\\\"on\\\": 1}], [[\\\"it\\\", \\\"on\\\"], {\\\"top\\\": 1}], [[\\\"on\\\", \\\"top\\\"], {\\\"now\\\": 1}], [[\\\"top\\\", \\\"now\\\"], {\\\"keep\\\": 1}], [[\\\"now\\\", \\\"keep\\\"], {\\\"Snapchat\\\": 1}], [[\\\"keep\\\", \\\"Snapchat\\\"], {\\\"on\\\": 1}], [[\\\"Snapchat\\\", \\\"on\\\"], {\\\"top./n@fmanjoo\\\": 1}], [[\\\"on\\\", \\\"top./n@fmanjoo\\\"], {\\\"AI./n@fmanjoo\\\": 1}], [[\\\"top./n@fmanjoo\\\", \\\"AI./n@fmanjoo\\\"], {\\\"Because\\\": 1}], [[\\\"AI./n@fmanjoo\\\", \\\"Because\\\"], {\\\"many\\\": 1}], [[\\\"Because\\\", \\\"many\\\"], {\\\"of\\\": 1}], [[\\\"many\\\", \\\"of\\\"], {\\\"those\\\": 1}], [[\\\"those\\\", \\\"followers\\\"], {\\\"aren't\\\": 1}], [[\\\"followers\\\", \\\"aren't\\\"], {\\\"seeing\\\": 1}], [[\\\"aren't\\\", \\\"seeing\\\"], {\\\"your\\\": 1}], [[\\\"seeing\\\", \\\"your\\\"], {\\\"posts\\\": 1}], [[\\\"your\\\", \\\"posts\\\"], {\\\"due\\\": 1}], [[\\\"posts\\\", \\\"due\\\"], {\\\"to\\\": 1}], [[\\\"due\\\", \\\"to\\\"], {\\\"Facebook's\\\": 1}], [[\\\"to\\\", \\\"Facebook's\\\"], {\\\"news\\\": 1}], [[\\\"Facebook's\\\", \\\"news\\\"], {\\\"feed\\\": 1}], [[\\\"news\\\", \\\"feed\\\"], {\\\"algorithm.\\\": 1}], [[\\\"feed\\\", \\\"algorithm.\\\"], {\\\"___END__\\\": 1}]]\", \"parsed_sentences\": null}",
    "modelSize": {
        "tweets": 100,
        "words": 1184
    },
    "modelDate": [
        "Jan-2015",
        "Nov-2018"
    ],
    "analytics": {
        "aggregateSentiment": {
          "1 - very negative": 1,
          "2 - negative": 11,
          "3 - neutral": 56,
          "4 - positive": 27,
          "5 - very positive": 5
        },
        "wordCloud": [
            {
                "count": 9,
                "value": "people"
            },
            {
                "count": 8,
                "value": "facebook"
            },
            {
                "count": 6,
                "value": "bounty"
            },
            {
                "count": 6,
                "value": "new"
            },
            {
                "count": 6,
                "value": "cards"
            },
            {
                "count": 6,
                "value": "use"
            },
            {
                "count": 6,
                "value": "probably"
            },
            {
                "count": 5,
                "value": "one"
            },
            {
                "count": 5,
                "value": "link"
            },
            {
                "count": 4,
                "value": "getting"
            },
            {
                "count": 4,
                "value": "twitter"
            },
            {
                "count": 4,
                "value": "less"
            },
            {
                "count": 4,
                "value": "time"
            },
            {
                "count": 4,
                "value": "@homakov"
            },
            {
                "count": 4,
                "value": "@thegrugq"
            },
            {
                "count": 3,
                "value": "oauth"
            },
            {
                "count": 3,
                "value": "thanks"
            },
            {
                "count": 3,
                "value": "writeup"
            },
            {
                "count": 3,
                "value": "bug"
            },
            {
                "count": 3,
                "value": "there's"
            },
            {
                "count": 3,
                "value": "good"
            },
            {
                "count": 3,
                "value": "also"
            },
            {
                "count": 3,
                "value": "looks"
            },
            {
                "count": 3,
                "value": "like"
            },
            {
                "count": 3,
                "value": "lot"
            }
        ]
    }
})


  const reset = () => {
    setUserModel({
      analytics: null,
      user: null,
      userHandle: null,
      userProfilePicture: null,
      userMetrics: null,
      userJoined: null,
      currentModel: null,
      modelSize: null,
      modelDate: null,
    })
    setTweets([])
    setStatus({
      message: null,
      loading: false,
      show: false,
      error: false,
    })
  }


  const [tweetKey, setTweetKey] = useState(0)

  React.useEffect(() => { // generates tweets when the model is loaded or changed
    if (userModel.currentModel) { // this is because the new functional setstate doesn't update the state immediately
      generateTweets() // and doesn't allow for callbacks immediately after the state is set
    }                   // there's probably a better way to do this
  }, [userModel.currentModel])

  React.useEffect(() => { // sets a key to the tweets to force remounting of the tweet display area
    setTweetKey(tweetKey + 1) // this is a bit of a hacky way to force the tweet display area to remount and trigger the fadein animation
  }, [tweets])

  const generateTweets = (event) => {
    setStatus({
      loading: true,
      message: "Generating tweets...",
      show: true,
      error: false
    })
    fetch("/generate_tweets", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          model: userModel.currentModel
        })
      // body: JSON.stringify(["test"])
    })
    .then(response => {
      return response.json()
    })
    .then( (response) => {
      setStatus({
        message: null,
        loading: false,
        show: false,
        error: false,
      })
      setTweets(response.tweets)
    })
    .catch( (error) => {
      setTweets([])
      setStatus({
        message: "Error generating tweets",
        loading: false,
        show: false,
        error: true
      })
    })
  }

  const resetTweets = () => setTweets([])

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
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

  const importJson = e => {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      const json = JSON.parse(e.target.result)
      setUserModel(json)
    }
    reader.readAsText(file)
  }

  const ImportJsonButton = () => {
    return (
      <div>
        <Button colorScheme={"teal"}>
        <FormLabel
          htmlFor="import-json"
          className="import-button"
          h="100%"
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          m="0"
          _hover={{ cursor: "pointer" }}
        >
            Upload a previous model (.json)
          <Input
          colorScheme={"teal"}
          type="file"
          id="import-json"
          accept=".json"
          onChange={importJson}
          h="100%"
          w="100%"
          display="none"
        />
        </FormLabel>
        </Button>

      </div>
    )
  }

  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <TitleBar logoSrc={require('./images/logo.png')} title="Markov Tweet Generator"/>
          <Container maxW='container.md' paddingTop={2}>
            { !userModel.user && // show the start screen if there is no user
              <StartScreen
                userModel = {userModel}
                setUserModel={setUserModel}
                resetTweets={resetTweets}
                generateTweets={generateTweets}
                status={status}
                setStatus={setStatus}
                primaryColor={primaryColor}
                ImportJsonButton={ImportJsonButton}
              />
            }

            { userModel.user &&
              <ModelDisplayArea
                userModel={userModel}
                setTweets={setTweets}
                generateTweets={generateTweets}
                reset={reset}
                status={status}
                exportToJson={exportToJson}
              />
            }
            <TweetDisplayArea key={tweetKey} tweets={tweets} userModel={userModel} generateTweets={generateTweets}/>
          </Container>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
