type OldProperty = {
  id: string,
  title: string,
  locationId: string,
  address: string,
  image: string,
  phone: string,
};

type OldLocation = {
  id: string,
  region: string,
  imageURL: string,
  clickCount: number,
  properties: OldProperty[],
};

export default OldLocation;
