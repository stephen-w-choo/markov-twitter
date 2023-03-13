import React from 'react'
import { TagCloud } from 'react-tagcloud'


function WordCloudBox({wordCloud}) {
  const options = {
    luminosity: 'dark',
    hue: 'green'
  }

  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={wordCloud}
      colorOptions={options}
      shuffle={false}
    />
  )
}

export default WordCloudBox;
