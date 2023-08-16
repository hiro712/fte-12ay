import { useDataAdmin } from '@/contexts/useDataAdmin';
import { usePort } from '@/contexts/usePort';
import { lines2FlightData, modeCode2Text } from '@/services/data';
import { updateByRefDB } from '@/services/database';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

export default function Top() {
  const { requestPort, readLine, stopRead, isReading, lines, port } = usePort();
  const {
    key,
    isApploading,
    initData,
    startAppload,
    endAppload,
    readData,
    isReading: isDataReading,
    currentContent,
  } = useDataAdmin();

  useEffect(() => {
    if (lines.length === 0) return;
    if (key === null || '') return;
    if (!isApploading) return;
    const data = lines2FlightData(lines);
    console.log('data', data);
    updateByRefDB('data/' + key + '/content', JSON.stringify(data));
  }, [lines, key, isApploading]);

  return (
    <Stack spacing={2}>
      <Box>
        <ButtonGroup variant="contained" aria-label="port button group">
          <Button onClick={requestPort}>開く</Button>
          {port ? (
            <Button onClick={readLine}>開始</Button>
          ) : (
            <Button disabled>開始</Button>
          )}
          {port && isReading ? (
            <Button onClick={stopRead}>停止</Button>
          ) : (
            <Button disabled>停止</Button>
          )}
        </ButtonGroup>
      </Box>
      <TextField
        label="シリアルモニタ"
        multiline
        aria-readonly
        rows={10}
        value={lines.join('\n')}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {key ? (
          <Typography sx={{ fontWeight: 'bold' }}>ID: {key}</Typography>
        ) : (
          <Button variant="contained" onClick={initData}>
            プロジェクトを作成
          </Button>
        )}
        {isApploading ? (
          <Button variant="outlined" onClick={endAppload}>
            アップロード中...
          </Button>
        ) : (
          <Button variant="contained" onClick={startAppload}>
            アップロード
          </Button>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {isDataReading ? (
          <Button variant="outlined" disabled>
            読み込み中...
          </Button>
        ) : (
          <Button variant="contained" onClick={readData}>
            データを読み込む
          </Button>
        )}
      </Box>
      {currentContent && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Mode</TableCell>
                  <TableCell align="right">FlightPin</TableCell>
                  <TableCell align="right">Height(m)</TableCell>
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{currentContent.time}</TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {currentContent.mode}
                  </TableCell>
                  <TableCell align="right">{currentContent.pin}</TableCell>
                  <TableCell align="right">{currentContent.height}</TableCell>
                  <TableCell align="right">{currentContent.latitude}</TableCell>
                  <TableCell align="right">
                    {currentContent.longitude}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText primary={`時刻: ${currentContent.time}`} />
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`モード: ${modeCode2Text(
                          currentContent.mode,
                        )}`}
                      />
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`高度: ${currentContent.height}m`}
                      />
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`緯度: ${currentContent.latitude}`}
                      />
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`経度: ${currentContent.longitude}`}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Stack>
  );
}
