
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';

import AssignmentIcon from '@mui/icons-material/Assignment';

import Link from 'next/link'


export const mainListItems = (
  <div>
    <Link href="/poblacion">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Gestionar Población" />
      </ListItem>
    </Link>

    <Link href="/hojacargo/new">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Gestionar Hoja Cargo" />
      </ListItem>
    </Link>
  </div>
);


export const secondaryListItems = (
  <div>
    <ListSubheader inset>CATEGORIAS</ListSubheader>
    <Link href="/intervension/new">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Intervensión" />
      </ListItem>
    </Link>   
    <Link href="/enfermedad/new">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Enfermedad" />
      </ListItem>
    </Link> 
    <Link href="/consultoriomedico/new">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Consultorio Médico" />
      </ListItem>
    </Link> 
  </div>
);
