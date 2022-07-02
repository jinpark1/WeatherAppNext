import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface LocationSearchProps {
  onChange: (text: string) => void;
  onClick: () => void;
}
export default function LocationSearch(props: LocationSearchProps) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        marginBottom: '15px',
      }}
    >
      <TextField
        id="outlined-basic"
        label="Location"
        onChange={ e => props.onChange(e.currentTarget.value) }
        variant="outlined"
      />
      <Button onClick={ () => props.onClick() } sx={{ marginLeft: '7px', width: '115px' }} variant="contained">Search</Button>
    </Box>
  );
}