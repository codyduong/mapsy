import React, { useState } from 'react';
import styled from 'styled-components';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button, TextField } from '@mui/material';
import { Google } from '@mui/icons-material';
import Firebase from '../App.firebase';

const AppLoginModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.325);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
`;

const AppLoginOffClickDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 400;
`;

const AppLoginDiv = styled.div`
  width: 500px;
  height: 500px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%);
  z-index: 500;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 25px;
  padding-top: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const TextFieldWrapper = styled.div`
  margin-bottom: 25px;
`;

const SignInRow = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Roboto;
  color: #81bed5;
  font-size: 0.9rem;
  margin-bottom: 40px;
`;

const SignInText = styled.a`
  cursor: pointer;
`;

const FakeLinebreakWrapper = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  color: #b4b4b4;
  align-items: center;
  font-family: Roboto;
`;

const FakeLine = styled.div`
  flex: 1;
  height: 2px;
  background-color: #b4b4b4;
  margin: 0 10px;
`;

const SignInGoogleWrapper = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
`;

// const GoogleIconWrapper = styled.div`
//   display: flex;
  
// `;

const LoginImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const LoginImage = styled.img`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  border-radius: 50%;
  overflow: hidden;
`;

const WelcomeText = styled.div`
  font-size:1.5rem;
  font-family: Roboto;
  color: #b4b4b4;
  text-align: center;
  margin: 0 auto;
`;

const clickSignInWithEmail = async (email: string, password: string, setAccountModalVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
  await Firebase.auth()?.signInWithEmailAndPassword(email, password);
  setAccountModalVisible(false);
};


const clickRegisterWithEmail = async (email: string, password: string, setAccountModalVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
  await Firebase.auth()?.createUserWithEmailAndPassword(email, password);
  setAccountModalVisible(false);
};


interface AppLoginProps {
  setAccountModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AppLogin = (props: AppLoginProps) => {
  const {setAccountModalVisible} = props;
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clickGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
          
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(`Something blew up, reporting with ${[errorCode, errorMessage, email, credential]}`);
      }).finally(() => {
        setAccountModalVisible(false);
      });
  };

  const handleAuth = () => {
    if (auth.currentUser) {
      const cU = auth.currentUser;
      return (<>
        <LoginImageWrapper><LoginImage src={cU.photoURL ?? ''}/></LoginImageWrapper>
        <WelcomeText>Welcome, {`${cU.displayName}`}</WelcomeText>
        <SignInGoogleWrapper><Button variant="contained" fullWidth onClick={() => {
          Firebase.auth().signOut();
          setAccountModalVisible(false);
        }}>Sign Out</Button ></SignInGoogleWrapper>
      </>);
    } else {
      return (<>
        <TextFieldWrapper><TextField value={email} onChange={(e) => {setEmail(e.target.value);}} 
          fullWidth label="Email / Username"/></TextFieldWrapper>
        <TextFieldWrapper><TextField value={password} onChange={(e) => {setPassword(e.target.value);}} 
          type="password" autoComplete="current-password"fullWidth label="Password"/></TextFieldWrapper>
        <SignInRow>
          <SignInText>Forgot your email/password?</SignInText>
          <Button variant="contained" onClick={() => {
            clickRegisterWithEmail(email, password, setAccountModalVisible); 
          }}>Register</Button>
          <Button variant="contained" onClick={() => {
            clickSignInWithEmail(email, password, setAccountModalVisible); 
          }}>Sign In</Button>
        </SignInRow>
        <FakeLinebreakWrapper><FakeLine/>OR SIGN IN WITH<FakeLine/></FakeLinebreakWrapper>
        <SignInGoogleWrapper><Button variant="contained" startIcon={<Google />} fullWidth onClick={() => {
          clickGoogleSignIn();
        }}>Google</Button >
        </SignInGoogleWrapper>
      </>);
    }
  };

  return (
    <AppLoginModal>
      <AppLoginOffClickDiv onClick={() => {setAccountModalVisible(false);}}/>
      <AppLoginDiv>
        {handleAuth()}
      </AppLoginDiv>
    </AppLoginModal>
  );
};

export default AppLogin;