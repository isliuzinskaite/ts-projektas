type Property = {
  id: string,
  title: string,
  address: string,
  image: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
};

type Location = {
  id: string,
  name: string,
  persons: string,
  price: string,
  properties: Property[],
  createdAt: string,
  updatedAt: string,
};

type Region = {
  id: string,
  name: string,
  locations: Location[],
  createdAt: string,
  updatedAt: string,
}

type OneRegion = {
  region: Region
};

type OneLocation = {
  location: Location
};

type OneProperty = {
  property: Property
};

export { Region, OneRegion, Location, OneLocation, Property, OneProperty };
