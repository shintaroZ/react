import React, {useEffect} from "react";
import Amplify from 'aws-amplify';

import awsconfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import TopPage from "./TopPage";

// 日本語化パッケージ
import { I18n } from "aws-amplify";
import vocabularies from "./vocabularies";

// aws接続情報
Amplify.configure(awsconfig);

function App() {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    useEffect(() => {
			onAuthUIStateChange((nextAuthState, authData) => {
					setAuthState(nextAuthState);
					setUser(authData);
        });
    }, []);

	return authState === AuthState.SignedIn && user ? (
        <TopPage />
    ) : (
		<AmplifyAuthenticator usernameAlias="email">
			// Singinカスタマイズ
			<AmplifySignIn slot="sign-in" hideSignUp={false} usernameAlias="email"/> 
		
			// Signupカスタマイズ
			<AmplifySignUp
				slot="sign-up"
				usernameAlias="email"
				formFields={[
				{
					type: "email",
					label: "Eメールアドレス",
					placeholder: "Enter your email address",
					required: true,
				},
				{
					type: "password",
					label: "Password",
					placeholder: "Enter your password",
					required: true,
				},
				]}
			></AmplifySignUp>
        </AmplifyAuthenticator>
    );
}
I18n.putVocabularies(vocabularies)
I18n.setLanguage('ja')
export default App;