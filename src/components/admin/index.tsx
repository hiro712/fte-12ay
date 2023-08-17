import { useDataRead } from '@/contexts/useDataRead';
import { useDataAppload } from '@/contexts/useDataAppload';
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
import Monitor from '../monitor';

export default function Top() {
  const { requestPort, readLine, stopRead, isReading, lines, port } = usePort();
  const { key, isApploading, initData, startAppload, endAppload, setLines } =
    useDataAppload();
  const {
    setKey,
    readData,
    isReading: isDataReading,
    currentContent,
  } = useDataRead();

  useEffect(() => {
    setKey(key);
  }, [key, setKey]);
  useEffect(() => {
    setLines(lines);
  }, [lines, setLines]);

  useEffect(() => {
    console.log('currentContent', currentContent);
  }, [currentContent]);

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
      {currentContent && <Monitor content={currentContent} />}
    </Stack>
  );
}
