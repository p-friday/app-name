import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {

    

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" >
          Trip planner
        </Typography>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Typography variant="h5" >
            Travel
            
          </Typography>
          <Box ml={2} position="relative">
            <div>
              <div>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" />
            </div>
            </Box>
        </Box>
      </Toolbar>
    </AppBar>
    
    </>
  );
};

export default Header;