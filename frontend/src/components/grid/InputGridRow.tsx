import TextField, { TextFieldProps } from '@mui/material/TextField';

import { LabeledGridRow } from './LabeledGridRow';

interface InputGridRowProps {
    label: string;
    inputProps?: TextFieldProps;
}

export const InputGridRow = (props: InputGridRowProps) => {
    return <LabeledGridRow label={props.label}>
        <TextField
            fullWidth
            size='small'
            InputProps={{
                readOnly: true,
            }}
            {...props.inputProps}
        />
    </LabeledGridRow>;
}