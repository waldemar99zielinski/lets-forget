import { CenteredView } from "src/components/pages/CenteredView"

import { SignInForm } from "src/components/authorization/SignInForm";
import { AuthFormContainer } from "src/components/authorization/AuthFormContainer";
import { RedirectSignInSignUp } from "src/components/authorization/RedirectSignInSignUp";

export const SignInPage = () => {
    return <CenteredView>
        <AuthFormContainer>
            <SignInForm />
            <RedirectSignInSignUp />
        </AuthFormContainer>
    </CenteredView>;
}