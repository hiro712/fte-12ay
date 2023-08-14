import { useDataAdmin } from '@/contexts/useDataAdmin';
import { usePort } from '@/contexts/usePort';
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

export default function Top() {
  const { requestPort, readLine, stopRead, isReading, lines, port } = usePort();
  const { key, isApploading, initData, startAppload, endAppload, contents } =
    useDataAdmin();

  useEffect(() => {
    console.log('lines', lines);
  }, [lines]);
  useEffect(() => {
    console.log('contents', contents);
  }, [contents]);

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
        rows={20}
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
    </Stack>
  );
}
