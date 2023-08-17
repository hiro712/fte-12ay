import { modeCode2Text } from '@/services/data';
import { FlightData } from '@/types/data';
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';

type Props = {
  content: FlightData;
};

export default function Monitor({ content }: Props) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Mode</TableCell>
              <TableCell align="right">Height(m)</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
              <TableCell align="right">AngleX[°]</TableCell>
              <TableCell align="right">AngleY</TableCell>
              <TableCell align="right">AngleZ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{content.time}</TableCell>
              <TableCell component="th" scope="row" align="right">
                {content.mode}
              </TableCell>
              <TableCell align="right">{content.height}</TableCell>
              <TableCell align="right">{content.latitude}</TableCell>
              <TableCell align="right">{content.longitude}</TableCell>
              <TableCell align="right">{content.angle.x}</TableCell>
              <TableCell align="right">{content.angle.y}</TableCell>
              <TableCell align="right">{content.angle.z}</TableCell>
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
                  <ListItemText
                    primary={`時刻: ${dayjs(content.time).format(
                      'HH時mm分ss秒',
                    )}`}
                  />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`モード: ${modeCode2Text(content.mode)}`}
                  />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemText primary={`高度: ${content.height}m`} />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemText primary={`緯度: ${content.latitude}`} />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemText primary={`経度: ${content.longitude}`} />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemText primary={`角度X: ${content.angle.x}°`} />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemText primary={`角度Y: ${content.angle.y}°`} />
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemText primary={`角度Z: ${content.angle.z}°`} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
