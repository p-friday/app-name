import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = () => {
  const [elRefs, setElRefs] = useState([]);
  const[type, setType] = useState('restaurans');
  const[rating, setRating] = useState('');
  
const places = [
    { name: 'Błąd'},
    
];
 

  return (
    <div>
      <Typography variant="h4">Hotels and restaurants</Typography>
        
          <FormControl >
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
              <MenuItem value="muzea">Muzea</MenuItem>
              <MenuItem value="pharmacy">pharmacy</MenuItem>
            </Select>
          </FormControl>
          <FormControl >
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3</MenuItem>
              <MenuItem value={4}>Above 4</MenuItem>
              <MenuItem value={5}>Above 5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3}>
            {places?.map((place, i) => (
                <Grid item key={i} xs={12}>
                    <PlaceDetails place={place} />
                </Grid>
            ))}
          </Grid>   
    </div>
  );
};

export default List;