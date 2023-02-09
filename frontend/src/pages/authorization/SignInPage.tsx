import { CenteredView } from 'src/components/pages/CenteredView'

import { SignInForm } from 'src/components/authorization/SignInForm';
import { AuthFormContainer } from 'src/components/authorization/AuthFormContainer';
import { RedirectSignInSignUp } from 'src/components/authorization/RedirectSignInSignUp';
import { GoogleAuthButton } from 'src/components/authorization/GoogleAuthButton';
import { AuthStrategyDivider } from 'src/components/authorization/AuthStrategyDivider';

export const SignInPage = () => {
    return <CenteredView>
        <AuthFormContainer>
            <SignInForm />
            <RedirectSignInSignUp />
            <AuthStrategyDivider />
            <GoogleAuthButton />
        </AuthFormContainer>
    </CenteredView>;
}