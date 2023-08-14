import { usePort } from '@/contexts/usePort';
import { Box, Button, ButtonGroup, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';

export default function Top() {
  const {requestPort, readLine, stopRead, isReading, lines, port} = usePort()

  useEffect(() => {
    console.log("lines", lines)
  }, [lines])

  return (
    <Stack spacing={2}>
      <Box>
        <ButtonGroup variant="contained" aria-label="port button group">
          <Button onClick={requestPort}>開く</Button>
          {port ? <Button onClick={readLine}>開始</Button> : <Button disabled>開始</Button>}
          {port&&isReading ? <Button onClick={stopRead}>停止</Button> : <Button disabled>停止</Button>}
        </ButtonGroup>
      </Box>
      <TextField label="シリアルモニタ" multiline aria-readonly rows={20} value={lines.join("\n")} />
    </Stack>
  );
}
