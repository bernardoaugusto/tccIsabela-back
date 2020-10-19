import axios from 'axios';

const loop = async (): Promise<void> => {
  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  const s = today.getSeconds();

  // eslint-disable-next-line no-console
  console.log(today);
};

export default loop;
