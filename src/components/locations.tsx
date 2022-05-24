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
import locations from '../data';

const Locations: React.FC = () => (
  <Container maxWidth="md" component="main">
    <Grid container spacing={5} alignItems="flex-end">
      {locations.map((location) => (
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
              subheader={`${location.count} būstai`}
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

export default Locations;
