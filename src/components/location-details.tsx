import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetLocationQuery } from '../services/region-api';
import { Location } from '../types';
import getAdmin from '../services/get-admin';

const LocationFragment = ({ location }: { location: Location }) => {
  const [admin] = useState(getAdmin);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const remove = async (id: string) => {
    // https://thewebdev.info/2021/09/19/how-to-fix-the-no-restricted-globals-eslint-error-when-developing-a-react-app/#:~:text=a%20React%20App-,To%20fix%20the%20'No%20restricted%20globals'%20ESLint%20Error%20when%20developing,variable%20that%20causes%20the%20error.
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm('Ar tikrai?') !== true) return;

    setDeleteError(null);
    try {
      setDeleteLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:1337/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJSON = await response.json();
      if (response.status === 200) {
        window.location.href = '/';
      } else {
        setDeleteError(`Ištrinti būsto nepavyko, bandykite dar kartą. Klaida: ${responseJSON.error}`);
      }
    } catch (err) {
      setDeleteError('Ištrinti būsto nepavyko, serverio klaida.');
    }
    setDeleteLoading(false);
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 2 }}>
        {location.name}
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
                titleTypographyProps={{ align: 'center' }}
              />
              <CardContent>
                <Typography>
                  Adresas:
                  {' '}
                  {property.address}
                </Typography>
                <Typography>
                  Tel.:
                  {' '}
                  {property.phone}
                </Typography>
              </CardContent>
              {admin
                && (
                  <CardActions>
                    <Button
                      variant="text"
                      color="secondary"
                      href={`/properties/${property.id}/edit`}
                    >
                      Redaguoti
                    </Button>
                    <Button
                      variant="text"
                      color="warning"
                      onClick={() => remove(property.id)}
                    >
                      Trinti
                    </Button>
                  </CardActions>
                )}
            </Card>
          </Grid>
        ))}
      </Grid>
      {deleteError
        && (<Typography>Klaida: būsto ištrinti nepavyko</Typography>)}
      {deleteLoading
        && (<Typography>Būstas trinamas, prašome palaukti</Typography>)}
    </Container>
  );
};

const LocationDetails: React.FC = () => {
  // https://lifesaver.codes/answer/possible-useparams-typescript-broken-definition-8200
  const { locationId } = useParams() as { locationId: string };
  const {
    data: locationData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLocationQuery(locationId);

  let content;

  if (isLoading) {
    content = <>Kraunama...</>;
  } else if (isSuccess) {
    content = <LocationFragment location={locationData.location} />;
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
