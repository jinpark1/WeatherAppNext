import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function AutoComplete(props: any) {
  const [open, setOpen] = React.useState(false);
  const [weahterOptions, setWeatherOptions] = React.useState<any>([]);
  const [loadWeather, setLoadWeather] = React.useState<boolean>(false);

  const getSearchResults = async (location: string = "Los Angeles") => {
    setLoadWeather(true);
    try {
      const res = await fetch(`/api/search?name=${location}`);
      const searchRes = await res.json();
      setWeatherOptions(searchRes);
    } catch (err) {
      console.log("ERROR", err);
    } finally {
      setLoadWeather(false);
    }
  }

  React.useEffect(() => {
    getSearchResults()
  }, [])

  const debounce = (fn: any, delay: any) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    }
  }

  const onInputChangeHandler = React.useCallback(
    (e: any, newValue: string) => {
      if (newValue.length)
        getSearchResults(newValue);
    }, [])

  const debounceHandler = React.useMemo(
    () => debounce(onInputChangeHandler, 1000)
  , [onInputChangeHandler])

  return (
    <Autocomplete
      id="location-autocomplete"
      filterOptions={(x) => x}
      sx={{ maxWidth: 345, marginBottom: '10px' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={ (e, newValue) => props.onChange(e, newValue) }
      onInputChange={ debounceHandler }
      isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
      getOptionLabel={(option) => option.name + ', ' + option.region}
      options={weahterOptions}
      loading={loadWeather}
      noOptionsText={"No Results Found."}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loadWeather ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
