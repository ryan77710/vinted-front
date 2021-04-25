import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return value;
}

const RangeSlider = ({ priceValue, setPriceValue }) => {
  const classes = useStyles({});

  const handleChange = (event, newValue) => {
    setPriceValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom></Typography>

      <Slider
        min={0}
        max={5000}
        step={10}
        value={priceValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
};
export default RangeSlider;
