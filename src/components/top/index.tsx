import { useDataRead } from '@/contexts/useDataRead';
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Monitor from '../monitor';
import { useProject } from '@/contexts/useProject';
import { ProjectList } from '@/types/data';

export default function Top() {
  const { projectLists } = useProject();
  const [currentProject, setCurrentProject] = useState<ProjectList | null>(
    null,
  );

  useEffect(() => {
    console.log(projectLists);
  }, [projectLists]);
  const {
    setKey,
    readData,
    archiveData,
    isReading,
    isArchiving,
    progress,
    currentContent,
    setCurrentContent,
  } = useDataRead();

  const startReadData = async () => {
    if (currentProject) {
      setKey(currentProject.key);
      readData();
    }
  };

  return (
    <Stack spacing={2}>
      {currentProject ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {isReading ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCurrentProject(null);
                      setCurrentContent(null);
                    }}
                  >
                    違うデータを選択
                  </Button>
                  <Typography sx={{ ml: 2, my: 'auto' }}>
                    現在:{currentProject.project.name}
                  </Typography>
                </Box>
                {isArchiving ? (
                  <Button variant="contained" disabled>
                    アーカイブ再生中...
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => archiveData(currentProject.project.contents)}
                  >
                    アーカイブ再生
                  </Button>
                )}
              </>
            ) : (
              <Button variant="contained" onClick={startReadData}>
                データを読み込む
              </Button>
            )}
          </Box>
          {currentContent && (
            <>
              <LinearProgress variant="determinate" value={progress} />
              <Monitor content={currentContent} />
            </>
          )}
        </>
      ) : (
        <Grid container spacing={2}>
          {projectLists.length != 0 &&
            projectLists.map((project, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={project.key}>
                  <Card>
                    <CardMedia
                      image={'/rocket' + (index % 3) + '.jpg'}
                      title="rocket"
                    />
                    <CardContent>
                      <Stack spacing={2}>
                        {project.project.isApploading ? (
                          <Badge
                            color="success"
                            badgeContent="オンライン"
                            overlap="circular"
                          >
                            <Typography variant="h5">
                              {project.project.name}
                            </Typography>
                          </Badge>
                        ) : (
                          <Typography variant="h5">
                            {project.project.name}
                          </Typography>
                        )}
                        <Typography variant="body2">
                          {'データ長: ' +
                            (project.project.contents != ''
                              ? JSON.parse(project.project.contents).length
                              : 0)}
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => setCurrentProject(project)}
                        >
                          選択
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      )}
    </Stack>
  );
}
