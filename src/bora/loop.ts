import { getRepository } from 'typeorm';
import axios from 'axios';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export const getByDay = async (): Promise<Appointment[]> => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return getRepository(Appointment).query(
    `select * from appointments where date BETWEEN '2020-10-19' AND '2020-10-20'`,
  );
};

const loop = async (): Promise<void> => {
  const today = new Date();
  const hours = today.getHours();

  const appointments = await getByDay();

  // eslint-disable-next-line no-console
  console.log(appointments);
};

export default loop;
