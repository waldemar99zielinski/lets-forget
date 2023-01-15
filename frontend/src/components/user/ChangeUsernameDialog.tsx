import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { patchUserMe, PatchUserMe } from 'src/api/user/user.api';
import { useAlert } from 'src/context/alerts/useAlert';
import { Dialog, DialogProps } from 'src/components/dialog/Dialog';
import { useUser } from 'src/context/user/useUser';
import { Logger } from 'src/utils/logger';

interface RenameUserDialogProps {
    open: DialogProps['open'];
    onClose: DialogProps['onClose'];
}

export const ChangeUsernameDialog = (props: RenameUserDialogProps) => {
    const {t} = useTranslation('user');
    const {register , handleSubmit, formState: {errors, isDirty, isSubmitting}} = useForm<PatchUserMe>();
    const [renameError] = useAlert({text: t('dialog.changeUsername.error.request'), type: 'error', closeAfter: 3_000});
    const {user, updateUser} = useUser();
    const [remoteError, setRemoteError] = useState('');

    if(!user) {
        Logger.warn('User is not present');
        return null;
    }

    const onSubmit = async (data: PatchUserMe) => {
        console.log('onSubmit data', data);

        if(remoteError)
            return;

        try {
            await patchUserMe(data);
            updateUser({username: data.username});
            props.onClose();
        } catch(error: any) {
            if(error.response && error.response.status === 409) {
                setRemoteError(t<string>('dialog.changeUsername.error.conflict'));
                return;
            }

            Logger.error('Change username error', error);
            renameError();
        }
    };

    return <Dialog
        title={t<string>('dialog.changeUsername.title')}
        open={props.open}
        onClose={props.onClose}
    >
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
                sx={{
                    padding: '1rem'
                }}
            >
                {t('dialog.changeUsername.textDefaultUsername', {username: user.username})}
            </Typography>
            <Box sx={{
                padding: '1rem 1rem 0 1rem',
                width: '100%'
            }}>
            <TextField
                fullWidth
                placeholder={t<string>('dialog.changeUsername.inputPlaceholder')}
                error={!!errors.username?.message || !!remoteError}
                helperText={(errors.username?.message as string) || remoteError || ' '}
                {...register(
                    'username',
                    {
                        required: t<string>('dialog.changeUsername.error.required'),
                        validate: {
                            lengthMin: username => (username.length >= 3 || t<string>('dialog.changeUsername.error.langthMin')),
                            lengthMax: username => (username.length <= 64 || t<string>('dialog.changeUsername.error.lengthMax'))
                        },
                        onChange: () => setRemoteError('')
                    }
                )}
                autoComplete='off'
            />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    columnGap: '0.5rem'
                }}
            >
                <Button
                    variant='contained'
                    fullWidth
                >
                    {t('dialog.changeUsername.buttons.cancel')}
                </Button>
                <Button
                    variant='contained'
                    fullWidth
                    type='submit'
                    disabled={!!errors.username || !!remoteError}
                >
                    {t('dialog.changeUsername.buttons.submit')}
                </Button>
            </Box>
        </form>
    </Dialog>
}