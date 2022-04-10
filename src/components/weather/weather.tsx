import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
`;

const Temp = styled.div`
  display: flex;
  font-size: 3rem;
  font-weight: medium;
`;
const City = styled.div`
  display: flex;
  font-size: 1.1rem;
`;
const Icon = styled.img`
  display: flex;
  width: 100px;
  height: 100px;
  margin-right: auto;
`;

export default function Weather() {
  const [loading, setLoading] = useState(false);

  // const [weatherData, setWeatherData] = useState<any>();

  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     const url =
  //       'https://api.openweathermap.org/data/2.5/weather?lat=38.957799&lon=-95.254341&appid=5a0b57ce431eefabee13d9383277e55d&units=imperial';
  //     setWeatherData(await (await fetch(url)).json());
  //     setLoading(false);
  //   })();
  // }, []);

  // console.log({ weatherData });
  return (
    <>
      {!loading ? (
        <Box
          sx={{
            padding: '10px',
            display: 'flex',
            width: 250,
            height: 150,
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%)',
            backgroundColor: '#ffffff',
          }}
        >
          <Info>
            <Temp>{'53'}°</Temp>
            <City>{'Lawrence'}</City>
          </Info>
          <Icon src={'http://openweathermap.org/img/wn/01n@2x.png'}></Icon>
        </Box>
      ) : (
        <h4>Loading...</h4>
      )}
    </>
  );
}
