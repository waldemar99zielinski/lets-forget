import { CenteredView } from 'src/components/pages/CenteredView'

import { SignUpForm } from 'src/components/authorization/SignUpForm';
import { AuthFormContainer } from 'src/components/authorization/AuthFormContainer';
import { RedirectSignInSignUp } from 'src/components/authorization/RedirectSignInSignUp';
import { GoogleAuthButton } from 'src/components/authorization/GoogleAuthButton';
import { AuthStrategyDivider } from 'src/components/authorization/AuthStrategyDivider';

export const SignUpPage = () => {
    return <CenteredView>
        <AuthFormContainer>
            <SignUpForm />
            <RedirectSignInSignUp />
            <AuthStrategyDivider />
            <GoogleAuthButton />
        </AuthFormContainer>
    </CenteredView>;
}
