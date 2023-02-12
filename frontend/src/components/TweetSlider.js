import React, {useState} from 'react'
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'


function TweetSlider(props) {
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  return (
    <Box pt={6} pb={2}>
      <Slider
        aria-label='slider-ex-6'
        defaultValue={props.defaultTweetN}
        min={100}
        max={1600}
        onChange={(val) => props.setTweetN(val)}
        step={100}
      >
        <SliderMark value={400} {...labelStyles}>
          400
        </SliderMark>
        <SliderMark value={800} {...labelStyles}>
          800
        </SliderMark>
        <SliderMark value={1200} {...labelStyles}>
          1200
        </SliderMark>
        <SliderMark
          value={props.tweetN}
          textAlign='center'
          bg='blue.500'
          color='white'
          mt='-10'
          ml='-8'
          whiteSpace={'nowrap'}
        >
          {props.tweetN} tweets
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  )
}

export default TweetSlider
