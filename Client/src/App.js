import { Box, Paper, Stack, Table, TableRow, TableCell, TableContainer, TableHead, Typography, TableBody } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { useEffect, useState } from "react";


const TableComponent = ({ data }) => {
  return (
    <Box width={'80%'}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }} align="left">Id</TableCell>
              <TableCell sx={{ color: '#fff' }} align="left">Symbol</TableCell>
              <TableCell sx={{ color: '#fff' }} align="left">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ color: '#fff' }} align="left">{index}</TableCell>
                    <TableCell sx={{ color: '#fff' }} align="left">{data.symbol}</TableCell>
                    <TableCell sx={{ color: '#fff' }} align="left">
                      <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Typography width={40}>{data.price}</Typography>
                        <Stack>
                          {
                            data.prev > data.price ? <ArrowDownwardIcon sx={{ color: '#b91c1c' }} /> : <ArrowUpwardIcon sx={{ color: '#16a34a' }} />
                          }
                        </Stack>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

function App() {
  const [data, setData] = useState([]);
  const URL = "http://127.0.0.1:8080/prices";
  const INTERVAL = 2000;

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, INTERVAL);

    return () => {
      clearInterval(interval);
    }
  }, []);

  function fetchData() {
    fetch(URL)
      .then(res => res.json())
      .then(data => setData(data.data));
  }

  return (
    <Stack spacing={3} sx={{ backgroundColor: "#0f172a", height: '100vh', width: '100vw' }}>
      <Stack direction={'row'} justifyContent={'center'}>
        <Typography sx={{ color: '#fff' }} variant={'h5'}>Stock Prices</Typography>
      </Stack>

      <Stack direction={'row'} justifyContent={'center'}>
        <TableComponent data={data} />
      </Stack>
    </Stack>
  );
}

export default App;
