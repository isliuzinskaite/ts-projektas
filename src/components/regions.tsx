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
import { useGetAllQuery } from '../services/region-api';
import getAdmin from '../services/get-admin';

const Regions: React.FC = () => {
  const { data = [], error, isLoading } = useGetAllQuery();
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
      const response = await fetch(`http://localhost:1337/api/regions/${id}`, {
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
        setDeleteError(`Ištrinti regiono nepavyko, bandykite dar kartą. Klaida: ${responseJSON.error}`);
      }
    } catch (err) {
      setDeleteError('Ištrinti regiono nepavyko, serverio klaida.');
    }
    setDeleteLoading(false);
  };

  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {error
          && <>O ne, kažkas nepavyko</> }
        {isLoading
          && <>Kraunama...</> }
        {data
          && data.map((region) => (
            <Grid
              item
              key={region.id}
              xs={12}
              sm={6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={region.name}
                  titleTypographyProps={{ align: 'center' }}
                />
                <CardMedia
                  component="img"
                  height="256"
                  image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/768px-Home-icon.svg.png"
                />
                <CardContent>
                  <Typography>{`Vietovės: ${region.locations.length}`}</Typography>
                  <Typography>{`Būstai: ${region.locations.map((location) => location.properties.length).reduce((a, b) => a + b, 0)}`}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    href={`/regions/${region.id}`}
                  >
                    Matyti visas vietoves
                  </Button>
                </CardActions>
                {admin
                  && (
                    <CardActions>
                      <Button
                        variant="text"
                        color="secondary"
                        href={`/regions/${region.id}/edit`}
                      >
                        Redaguoti
                      </Button>
                      <Button
                        variant="text"
                        color="warning"
                        onClick={() => remove(region.id)}
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
        && (<Typography>Klaida: regiono ištrinti nepavyko</Typography>)}
      {deleteLoading
        && (<Typography>Regionas trinamas, prašome palaukti</Typography>)}
    </Container>
  );
};

export default Regions;
