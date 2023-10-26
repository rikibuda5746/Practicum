import { Select } from '../../components';
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { DivStyled } from './RangeOfYears.styeld'

interface Props {
  fromYear: number;
  toYear: number;
  setFromYear: (value: number) => void;
  setToYear: (value: number) => void;
  errorFromYear: boolean;
  errorToYear: boolean;
  setErrorFromYear: Function;
  setErrorToYear: Function;
}

const RangeOfYears = ({ fromYear, toYear, setFromYear, setToYear, errorFromYear, errorToYear, setErrorFromYear, setErrorToYear }: Props): JSX.Element => {
  const yearsFrom = [];
  const yearsTo = [];
  const currentYear = new Date().getFullYear();
  var fromYearArr = currentYear;
  var toYearArr = currentYear - 50;
  const fromYearName = "משנה";
  const toYearName = "עד שנה";

  // Create an array of years 
  if (toYear != 0) {
    fromYearArr = toYear;
  }

  for (let i = currentYear - 50; i <= fromYearArr; i++) {
    yearsFrom.push(i);
  }

  if (fromYear != 0) {
    toYearArr = fromYear;
  }

  for (let i = toYearArr; i <= currentYear; i++) {
    yearsTo.push(i);
  }

  const handleFromYearChange = (e: SelectChangeEvent<any>) => {
    setFromYear(+e.target.value);
    +e.target.value == 0 ? setErrorFromYear(true) : setErrorFromYear(false)
  };

  const handleToYearChange = (e: SelectChangeEvent<any>) => {
    setToYear(+e.target.value);
    +e.target.value == 0 ? setErrorToYear(true) : setErrorToYear(false)
  };

  return (
    <DivStyled>
      <b>{fromYearName}
        <Select sx={{ m: 1, minWidth: 110 }}
          value={fromYear}
          error={errorFromYear}
          helperText={errorFromYear ? 'שדה חובה' : ''}
          onChange={handleFromYearChange}
          onBlur={(e) => +e.target.value == 0 ? setErrorFromYear(true) : setErrorFromYear(false)}
        >
          {yearsFrom.slice().reverse().map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </b>

      <b>{toYearName}
        <Select
          sx={{ m: 1, minWidth: 110 }}
          value={toYear}
          error={errorToYear}
          helperText={errorToYear ? 'שדה חובה' : ''}
          onChange={handleToYearChange}
          onBlur={(e) => +e.target.value == 0 ? setErrorToYear(true) : setErrorToYear(false)}
        >
          {yearsTo.slice().reverse().map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </b>
    </DivStyled>
  );
};

export default RangeOfYears;
