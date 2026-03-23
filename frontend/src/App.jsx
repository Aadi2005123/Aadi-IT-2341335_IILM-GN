import './App.css'
import { SignInButton, UserButton, useAuth } from '@clerk/react'

function App() {
  const { isSignedIn } = useAuth();

  return (
    <>
     <h1>Welcome To The app</h1>
     {!isSignedIn ? (
       <SignInButton mode="modal" />
     ) : (
       <UserButton />
     )}
    </>
  );
}

export default App
