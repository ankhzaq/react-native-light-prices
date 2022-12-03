interface LighPriceInfo {
  date: string;
  hour: string;
  'is-cheap': boolean;
  'is-under-avg': boolean;
  market: string;
  price: number;
  units: string;
}
