import './App.css'
import { SignInButton } from '@clerk/react'

function App() {
  return (
    <>
     <h1>Welcome To The app</h1>
    <SignedOut>
     <SignInButton mode="modal" />
     <button>Login</button>
    </SignedOut>

    <SignedIn>
      <UserButton/>
    </SignedIn>
    </>
  );
}

export default App
