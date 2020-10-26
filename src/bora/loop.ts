/* eslint-disable no-console */
import { getRepository } from 'typeorm';
import axios from 'axios';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

let aux: number | null = null;

export const plataformaBora = async (value: 0 | 1): Promise<void> => {
  axios
    .post(
      `http://server.bora-iot.com/device/secret/a2c5d4788b2d9b8ddd0400cbc37d3ccbaa839bcd4026280fea279b9f47100464/data/ligaSistema?value=${value}`,
    )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const loop = async (): Promise<void> => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  let hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  console.log(`${day}-${month}-${year} ${hour}:${minutes}:${seconds}`);

  switch (hour) {
    case 21:
      hour = 0;
      break;
    case 22:
      hour = 1;
      break;
    case 23:
      hour = 2;
      break;
    default:
      hour += 3;
  }

  if (aux !== hour) {
    aux = hour;

    const appointments = await getRepository(Appointment).query(
      `select *
      from appointments a
      where date_part('year', a.date) = '${year}'
      and date_part('month', a.date) = '${month}'
      and date_part('day', a.date) = '${day}'
      and date_part('hour', a.date) = '${hour}'
      `,
    );

    if (appointments[0]) {
      plataformaBora(1);
    } else {
      plataformaBora(0);
    }
  }
};

export default loop;
