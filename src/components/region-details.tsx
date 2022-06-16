import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetRegionQuery } from '../services/region-api';
import { Region } from '../types';
import getAdmin from '../services/get-admin';

const RegionFragment = ({ region }: { region: Region }) => {
  const [admin] = useState(getAdmin);
  const [deleteError, setDeleteError] = useState<any | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const remove = async (id: string) => {
    // https://thewebdev.info/2021/09/19/how-to-fix-the-no-restricted-globals-eslint-error-when-developing-a-react-app/#:~:text=a%20React%20App-,To%20fix%20the%20'No%20restricted%20globals'%20ESLint%20Error%20when%20developing,variable%20that%20causes%20the%20error.
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Ar tikrai?') !== true) return;

    setDeleteError(null);
    try {
      setDeleteLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:1337/api/locations/${id}`, {
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
        setDeleteError(`Ištrinti vietovės nepavyko, bandykite dar kartą. Klaida: ${responseJSON.error}`);
      }
    } catch (err) {
      setDeleteError('Ištrinti vietovės nepavyko, serverio klaida.');
    }
    setDeleteLoading(false);
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 2 }}>
        {region.name}
      </Typography>
      <Grid container spacing={5} alignItems="flex-end">
        {region.locations.map((location) => (
          <Grid
            item
            key={location.id}
            xs={12}
            sm={6}
            md={4}
          >
            <Card>
              <CardHeader
                title={location.name}
                subheader={`Būstai: ${location.properties.length}`}
                titleTypographyProps={{ align: 'center' }}
              />
              <CardActions>
                <Button
                  fullWidth
                  variant="outlined"
                  href={`/locations/${location.id}`}
                >
                  Visi būstai
                </Button>
              </CardActions>
              {admin
                && (
                  <CardActions>
                    <Button
                      variant="text"
                      color="secondary"
                      href={`/locations/${location.id}/edit`}
                    >
                      Redaguoti
                    </Button>
                    <Button
                      variant="text"
                      color="warning"
                      onClick={(e) => remove(location.id)}
                    >
                      Trinti
                    </Button>
                  </CardActions>
                )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const RegionDetails: React.FC = () => {
  // https://lifesaver.codes/answer/possible-useparams-typescript-broken-definition-8200
  const { regionId } = useParams() as { regionId: string };
  const {
    data: regionData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRegionQuery(regionId);

  let content;

  if (isLoading) {
    content = <>Kraunama...</>;
  } else if (isSuccess) {
    content = <RegionFragment region={regionData.region} />;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }
  return (
    <Container maxWidth="md" component="main">
      {content}
    </Container>
  );
};

export default RegionDetails;
