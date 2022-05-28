import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  Grid,
} from '@mui/material';
import { useGetAllQuery } from '../services/location-api';

const Locations: React.FC = () => {
  const { data = [], error, isLoading } = useGetAllQuery();
  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {error
          && <>O ne, kažkas nepavyko</> }
        {isLoading
          && <>Kraunama...</> }
        {data
          && data.map((location) => (
            <Grid
              item
              key={location.region}
              xs={12}
              sm={6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={location.region}
                  subheader={`${location.properties.length} būstai`}
                  titleTypographyProps={{ align: 'center' }}
                />
                <CardMedia
                  component="img"
                  sx={{ width: '100%', display: { xs: 'none', sm: 'block' } }}
                  image={location.imageURL}
                />
                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    href={`/location/${location.id}`}
                  >
                    Matyti visus būstus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Locations;
