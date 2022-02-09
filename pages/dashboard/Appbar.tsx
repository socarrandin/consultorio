import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export default function Appbar() {
    return (
        <div>
             <Toolbar sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
             
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>

            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

          </Toolbar>
        </div>
    )
}
