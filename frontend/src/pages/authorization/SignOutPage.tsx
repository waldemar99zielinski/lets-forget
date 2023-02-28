import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CenteredView } from 'src/components/pages/CenteredView'
import { CircleLoading } from 'src/components/loading/CircleLoading';
import { useAuth } from 'src/context/auth/useAuth';

export const SingOutPage = () => {
    const {signOut} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        signOut();
        navigate('/')
    }, []);

    return <CenteredView>
        <CircleLoading />
    </CenteredView>;
}