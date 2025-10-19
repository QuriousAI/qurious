import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/chrome-extension";

import {FolderList} from "../../components/folder-list"

function App() {


  return (
    <>
            <div>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <div className="flex flex-col">
          <UserButton />
          <FolderList />
          </div>
        </SignedIn>
      </div>
    </>
  );
}

export default App;
