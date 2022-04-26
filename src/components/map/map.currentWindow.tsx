// This is the component we render at a marker, instead of google's shitty one
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import api, { DetectedObject } from '../../api';

const WindowDiv = styled.div`
  margin-top: 8rem;
  position: absolute;
  z-index: 200;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 10px;
  padding-top: 0px;
  flex-direction: column;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%);
  border-radius: 0.25rem;
`;

const WindowNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 0px;
`;

const Label = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const [XSize, YSize] = [480, 272];

const WindowImage = styled.img`
  max-width: ${XSize}px;
  max-height: ${YSize}px;
  object-fit: cover;
`;

const WindowImageWrapper = styled.div`
    position: relative;
    max-width: ${XSize}px;
    max-height: ${YSize}px;
    overflow: hidden;
`;

interface CurrentWindowProps {
  x: number;
  y: number;
  label: string;
  url: string;
  unmountSelf: () => void;
}

const BoundingSvg = styled.svg`
    border-width: 5px;
    position: absolute;
    pointer-events: none;
    z-index: 500;
    inset: 0 0;
`;

const Path = styled.path`
    fill: none;
    stroke: #ff0000;
    z-index: 500;
`;

const GenerateBoundingBoxes = (data: DetectedObject[]) => {
  const elements: JSX.Element[] = [];
  for (const detectedObject of data) {
    let pathD = `M ${detectedObject.boundingPoly.normalizedVertices[0].x * XSize} ${detectedObject.boundingPoly.normalizedVertices[0].y * YSize} `;
    detectedObject.boundingPoly.normalizedVertices.forEach((pair) => {
      pathD += `L ${pair.x*XSize} ${pair.y*YSize}`;
    });
    elements.push(
      <BoundingSvg>
        <Path d={`${pathD} Z`} />
      </BoundingSvg>
    );
  }
  return elements;
};

const FloatingText = styled.div`
    color: #ff0000;
    position: absolute;
`;

const GenerateBoundingText = (data: DetectedObject[]) => {
  const elements: JSX.Element[] = [];
  for (const detectedObject of data) {
    elements.push(<FloatingText style={
      {left: detectedObject.boundingPoly.normalizedVertices[0].x * XSize,
        top: detectedObject.boundingPoly.normalizedVertices[0].y * YSize,
      }}>{`${detectedObject.name}: ${detectedObject.score}`}</FloatingText>);
  }
  return elements;
};

export function CurrentWindow(props: CurrentWindowProps) {
  const { x, y, label, url, unmountSelf} = props;

  const [timestamp, setTimestamp] = useState(Math.floor(Date.now()));
  const [detected, setDetected] = useState<DetectedObject[]>([]);

  useEffect(() => {
    let mounted = true;
    const rerender = setInterval(async () => {
      mounted && setTimestamp(Math.floor(Date.now()));
    }, 5000);

    return (): void => {
      mounted = false;
      clearInterval(rerender);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    mounted && api.detectObjects(`${url}?timestamp=${timestamp}`).then((value) => {
      mounted && setDetected(value ?? []);
    });
    return (): void => {
      mounted = false;
    };
  }, [url, timestamp]);

  return (
    <WindowDiv
      style={
        {
          // top: y,
          // left: x,
        }
      }
    >
      <WindowNav>
        <Label>{label}</Label>
        <IconButton
          color="primary"
          sx={{ p: '10px' }}
          onClick={() => {
            unmountSelf();
          }}
        >
          <CloseIcon />
        </IconButton>
      </WindowNav>
      <WindowImageWrapper>
        <WindowImage
          src={`${url}?timestamp=${timestamp}`}
          alt={'Failed to load CCTV footage'}
        />
        {GenerateBoundingBoxes(detected)}
        {GenerateBoundingText(detected)}
      </WindowImageWrapper>
    </WindowDiv>
  );
}
