import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './style.css';

import { ClerkProvider, useAuth} from '@clerk/chrome-extension'


import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient("https://usable-perch-469.convex.cloud" as string);

const EXTENSION_URL = chrome.runtime.getURL('.')


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey="pk_test_cHJvcGVyLWJlZS04Mi5jbGVyay5hY2NvdW50cy5kZXYk"
          afterSignOutUrl={`${EXTENSION_URL}/popup.html`}
          signInForceRedirectUrl={`${EXTENSION_URL}/popup.html`}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <App />
      </ConvexProviderWithClerk>
    </ClerkProvider>
    </React.StrictMode>,
);
