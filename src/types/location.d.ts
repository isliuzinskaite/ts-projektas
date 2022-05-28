type Property = {
  id: string,
  title: string,
  locationId: string,
  address: string,
  image: string,
  phone: string,
};

type Location = {
  id: string,
  region: string,
  imageURL: string,
  clickCount: number,
  properties: Property[],
};

export default Location;
