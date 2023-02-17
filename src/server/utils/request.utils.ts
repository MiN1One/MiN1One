import * as geoIp from 'geoip-country';
import { Address6 } from 'ip-address';

export const parseUserIp = (ip: string) => {
  let ipv4 = ip;

  if (ipv4.includes(':')) {
    const address = new Address6(ipv4);
    ipv4 =  address.inspectTeredo().client4;
  }

  const country = geoIp.lookup(ipv4)?.country;

  return {
    country,
    ipv4,
  };
};