import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavbarLink = styled(NavLink)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: theme.palette.common.white,
  textDecoration: 'none',
  alignSelf: 'stretch',
  height: '100%',
  padding: theme.spacing(0, 4),
  transition: theme.transitions.create('color'),

  '&.active': {
    background: theme.palette.grey[800],
    boxShadow: `inset 0 -4px 0 0 ${theme.palette.primary.main}`,
  },

  ':hover': {
    color: theme.palette.primary.light,
  },
}));

export default NavbarLink;
