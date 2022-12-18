import { CenteredView } from 'src/components/pages/CenteredView'

import { SignUpForm } from 'src/components/authorization/SignUpForm';
import { AuthFormContainer } from 'src/components/authorization/AuthFormContainer';
import { RedirectSignInSignUp } from "src/components/authorization/RedirectSignInSignUp";

export const SignUpPage = () => {
    return <CenteredView>
        <AuthFormContainer>
            <SignUpForm />
            <RedirectSignInSignUp />
        </AuthFormContainer>
    </CenteredView>;
}
