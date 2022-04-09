// This is the component we render at a marker, instead of google's shitty one
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const WindowDiv = styled.div`
  position: absolute;
  z-index: 200;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 10px;
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
  label: string
  url: string
}

export function CurrentWindow(props: CurrentWindowProps) {
    const {x, y, label, url} = props;

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
        <WindowDiv style={{     
            top: y,
            left: x,
            width: `calc(${XSize}px + 20px)`,
            height: `calc(${YSize}px + 20px)`,
        }}>
            <WindowImage src={`${url}?timestamp=${timestamp}`} alt={'Failed to load CCTV footage'}/>
        </WindowDiv>

    );
}