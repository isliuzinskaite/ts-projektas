module.exports = () => {
  const f = require('@faker-js/faker');
  const faker = f.faker;
  
  const data = { locations: [], properties: [] };

  data.locations = [
    {
      "id": "mazoji-lietuva",
      "region": "Mažoji Lietuva",
      "imageURL": "/images/Mazoji_Lietuva_1_Botel_California.jpg",
      "clickCount": 0
    },
    {
      "id": "zemaitija",
      "region": "Žemaitija",
      "imageURL": "/images/Zemaitija_1_Casa_de_campo_glamping.jpg",
      "clickCount": 0
    },
    {
      "id": "aukstaitija",
      "region": "Aukštaitija",
      "imageURL": "/images/Aukstaitija_2_Namelis_prie_sermuksnio.jpg",
      "clickCount": 0
    },
    {
      "id": "suvalkija",
      "region": "Suvalkija",
      "imageURL": "/images/Suvalkija_1.jpg",
      "clickCount": 0
    },
    {
      "id": "dzukija",
      "region": "Dzūkija",
      "imageURL": "/images/Dzukija_1_VasaRojus.jpg",
      "clickCount": 0
    }
  ];

  data.locations.forEach((location) => {
    for (let i = 0; i < 6; i++) {
      const property = {
        id: `${location.id}-${i}`,
        title: faker.company.companyName(),
        locationId: location.id,
        address: faker.address.streetAddress(),
        image: faker.image.city(640, 480, true),
        phone: faker.phone.phoneNumber('+370 (8##) ## ####'),
      };
      data.properties.push(property);
    }
  });

  return data;
}
