import React from 'react'
import { TagCloud } from 'react-tagcloud'
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import FadeIn from 'react-fade-in/lib/FadeIn';


function WordCloudBox({wordCloud}) {
  const options = {
    luminosity: 'dark',
    hue: 'green'
  }

  // const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10)

  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={wordCloud}
      colorOptions={options}
      shuffle={false}
    />
    // <WordCloud
    // data={wordCloud}
    // width={200}
    // height={200}
    // font="Times"
    // fontStyle="italic"
    // fontWeight="bold"
    // fontSize={(word) => Math.log2(word.value) * 3}
    // spiral="rectangular"
    // rotate={(word) => word.value % 360}
    // padding={2}
    // random={Math.random}
    // fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
  // />
  )
}

export default WordCloudBox;
