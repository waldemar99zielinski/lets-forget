import Slider, {SliderProps} from '@mui/material/Slider';

const marks = (max: number) => [
    {value: 0, label: '0 km'},
    {value: max, label: `${max} km`},
];

export const RadiusSlider = (props: SliderProps) => {
    const {max = 20} = props;

    return <Slider 
        marks={marks(20)}
        min={0}
        max={max}
        step={1}
        valueLabelDisplay="auto"
        {...props}
    />;
}