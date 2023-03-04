import {
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';

import {
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react'

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
    <Box h="100%" w="280px" pb="50px">
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
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="red"/>
              <stop offset="95%" stopColor="green"/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="url(#colorPv)" />
        </AreaChart>

      </ResponsiveContainer>
      <Flex justifyContent="space-between">
        <Heading size="xs">Negative</Heading>
        <Heading size="xs">Positive</Heading>
      </Flex>
    </Box>
  )
}

export default SentimentGraph
