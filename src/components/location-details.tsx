import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetLocationQuery } from '../services/location-api';
import { Location } from '../types';

const LocationFragment = ({ location }: { location: Location }) => (
  <Container>
    <Typography variant="h5" sx={{ my: 2 }}>
      {location.region}
    </Typography>
    <Grid container spacing={5} alignItems="flex-end">
      {location.properties.map((property) => (
        <Grid
          item
          key={property.id}
          xs={12}
          sm={6}
          md={4}
        >
          <Card>
            <CardHeader
              title={property.title}
            />
            <CardMedia
              component="img"
              sx={{ width: '100%', display: { xs: 'none', sm: 'block' } }}
              image={property.image}
              alt={property.title}
            />
            <CardContent>
              <Typography>
                {property.address}
              </Typography>
              <Typography>
                Tel.:
                {' '}
                {property.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

const LocationDetails: React.FC = () => {
  // https://lifesaver.codes/answer/possible-useparams-typescript-broken-definition-8200
  const { locationId } = useParams() as { locationId: string };
  const {
    data: location,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLocationQuery(locationId);

  let content;

  if (isLoading) {
    content = <>Kraunama...</>;
  } else if (isSuccess) {
    content = <LocationFragment location={location} />;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }
  return (
    <Container maxWidth="md" component="main">
      {content}
    </Container>
  );
};

export default LocationDetails;
