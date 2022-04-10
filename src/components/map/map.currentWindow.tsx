// This is the component we render at a marker, instead of google's shitty one
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

const [XSize, YSize] = [480, 360];

const WindowImage = styled.img`
    max-width: ${XSize}px;
    max-height: ${YSize}px;
    object-fit: cover;
`;

interface CurrentWindowProps {
    x: number;
    y: number;
    label: string;
    url: string;
    unmountSelf: () => void;
}

export function CurrentWindow(props: CurrentWindowProps) {
  const { x, y, label, url, unmountSelf } = props;

  const [timestamp, setTimestamp] = useState(Math.floor(Date.now()));

  useEffect(() => {
    const rerender = setInterval(() => {
      setTimestamp(Math.floor(Date.now()));
    }, 5000);
    return (): void => {
      clearInterval(rerender);
    };
  });

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
      <WindowImage
        src={`${url}?timestamp=${timestamp}`}
        alt={'Failed to load CCTV footage'}
      />
    </WindowDiv>
  );
}
