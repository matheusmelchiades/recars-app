import React from 'react'
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem, withStyles } from '@material-ui/core';

const Dropdown = ({ classes, data = [], label, value, selectItem, scroll }) => {
  const labelWith = label.length * 7;

  const MenuProps = scroll ? {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250
      }
    }
  } : {}

  return (
    <FormControl variant="outlined" className={classes.field}>
      <InputLabel>{label}</InputLabel>
      <Select
        onChange={(e) => selectItem(e.target.value)}
        input={
          <OutlinedInput value={value} labelWidth={labelWith} />
        }
        MenuProps={MenuProps}>
        {
          data && data.map((opt, index) => (
            <MenuItem key={index} value={opt}>
              {opt}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

const styles = (theme) => ({
  field: {
    width: '100%',
    margin: theme.spacing.unit,
  }
});

export default withStyles(styles)(Dropdown)
