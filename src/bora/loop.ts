/* eslint-disable no-var */
import { getRepository } from 'typeorm';
import axios from 'axios';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

let aux: number | null = null;

export const getByDay = async (): Promise<Appointment[] | undefined> => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const hour = today.getHours() + 3;

  // console.log(day);
  console.log(`${day}-${month}-${year} : ${hour}`);

  if (aux !== hour) {
    aux = hour;

    return getRepository(Appointment).query(
      `select *
      from appointments a
      where date_part('year', a.date) = '${year}'
      and date_part('month', a.date) = '${month}'
      and date_part('day', a.date) = '${day}'
      and date_part('hour', a.date) = '${hour}'
      `,
    );
  }

  return undefined;
};

const loop = async (): Promise<void> => {
  const today = new Date();
  const hours = today.getHours();

  const appointments = await getByDay();

  // eslint-disable-next-line no-console
  console.log(appointments);
};

export default loop;
