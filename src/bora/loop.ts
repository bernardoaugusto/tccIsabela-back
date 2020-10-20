/* eslint-disable no-console */
import { getRepository } from 'typeorm';
import axios from 'axios';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

let aux: number | null = null;

export const plataformaBora = async (value: 0 | 1): Promise<void> => {
  axios
    .post(
      `http://server.bora-iot.com/device/secret/b21dcc851757c70dc42f825c95f8970410926a73a8b5aeb14e92c4f23aab25f0/data/variavel?value=${value}`,
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
  const hour = today.getHours() + 3;
  // const hour = 3;

  console.log(`${day}-${month}-${year} ${hour}:00:00`);

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
