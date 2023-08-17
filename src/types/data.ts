export type Angle = {
  x: number;
  y: number;
  z: number;
};

export type FlightData = {
  time: string;
  mode: number;
  height: number;
  latitude: number;
  longitude: number;
  angle: Angle;
};

export type ProjectData = {
  name: string;
  contents: string;
  isApploading: boolean;
};

export type ProjectList = {
  project: ProjectData;
  key: string;
};
