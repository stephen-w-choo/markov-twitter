import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import { Box } from '@chakra-ui/react'

function SentimentGraph({data}) {
  const processDataForGraph = (data) => {
    console.log(data)
    const processedData = []
    for (const [key, value] of Object.entries(data)) {
      processedData.push({
        sentiment: key,
        count: value
      })
    }
    //
    return processedData
  }

  return(
    <Box h="200px" w="280px">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={200}
          height={60}
          data={processDataForGraph(data)}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default SentimentGraph
