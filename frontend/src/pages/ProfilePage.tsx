import { useTranslation } from 'react-i18next';

import { CenteredViewLimitedWidth } from 'src/components/pages/CenteredViewLimitedWidth';
import { PageItem } from 'src/components/pages/PageItem';
import { GridContainer } from 'src/components/grid/GridContainer';
import { InputGridRow } from 'src/components/grid/InputGridRow';
import { useUser } from 'src/context/user/useUser';
import { CircleLoading } from 'src/components/loading/CircleLoading';
import { CenteredView } from 'src/components/pages/CenteredView';

export const ProfilePage = () => {
    const {t} = useTranslation('user');
    const {user, isLoading, setIsSelectDefaultCityDialogOpen} = useUser();

    if(isLoading)
        return <CenteredView>
            <CircleLoading />
        </CenteredView>;

    if(!user)
        throw new Error('Profile page user is null');

    return <CenteredViewLimitedWidth container={{
        paddingTop: '2rem',
        rowGap: '1rem'
    }}>

        <PageItem title={t<string>('profilePage.items.user.title')}>
            <GridContainer>
                <InputGridRow 
                    label={t('profilePage.items.user.emailLabel')}
                    inputProps={{
                        value: user.email
                    }}
                />
                <InputGridRow 
                    label={t('profilePage.items.user.usernameLabel')}
                    inputProps={{
                        value: user.username
                    }}
                />
            </GridContainer>
        </PageItem>
        {user.authStrategy === 'local' &&
            <PageItem title={t<string>('profilePage.items.security.title')}>
                <GridContainer>
                    <InputGridRow 
                        label={t('profilePage.items.security.passwordLabel')}
                        inputProps={{
                            value: t('profilePage.items.security.passwordPlaceholder'),
                            type: 'password'
                        }}
                    />
                </GridContainer>
            </PageItem>
        }
        <PageItem title={t<string>('profilePage.items.location.title')}>
            <GridContainer>
                <InputGridRow 
                    label={t('profilePage.items.location.defaultLocationLabel')}
                    inputProps={{
                        value: user.defaultCity,
                        onClick: () => setIsSelectDefaultCityDialogOpen(true)
                    }}
                />
            </GridContainer>
        </PageItem>
    </CenteredViewLimitedWidth>;
};