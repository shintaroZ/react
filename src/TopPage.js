import React, {useEffect} from "react";
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut } from '@aws-amplify/ui-react';


Amplify.configure(awsconfig);

function TopPage() {
    const [currentUserName, setCurrentUserName] = React.useState("");
    const [token, setToken] = React.useState();
    useEffect(() => {
        const init = async() => {
			// ログインユーザーの認証情報取得	
			const currentUser = await Auth.currentAuthenticatedUser();
			
			// idToken取得
			const token = currentUser.signInUserSession.idToken.jwtToken;
				
			console.log("====ログイン情報=====")
			console.log(currentUser)
			setCurrentUserName(currentUser.attributes.email);
			setToken(token)
        }
        init()
    }, []);

    const signOut = async() => {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
        document.location.reload();
    }

    return (
		<div>
			<p>ログインユーザ：{currentUserName}</p>
			<p>IDトークン：{token}</p>
			{/* サインアウトパッケージ */}
			<AmplifySignOut />
			{/* サインアウト独自 */}
            <button onClick={signOut}>サインアウト</button>
        </div>
    );
}

export default TopPage;