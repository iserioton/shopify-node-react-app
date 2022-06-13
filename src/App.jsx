import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
  NavigationMenu,
  TitleBar
} from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import config from './config/index.js';
import { HomePage } from "./components/HomePage";
import About from './components/About';
import Help from './components/Help';
import NotFound from './components/NotFound';
import { useEffect, useState } from "react";

export default function App() {
  const [pageTitle, setPageTile] = useState('Home');
  const titles = {
    '/dist/about': 'About',
    '/dist/help': 'Help',
    '/dist/': 'Home',
    '/dist': 'Home',
    '/': 'Home'
  }
  const primaryAction = { content: 'Help', url: '/dist/help' };
  const secondaryActions = [
    { content: 'Home', url: '/dist' }
  ];
  const actionGroups = [
    {
      title: 'Setting', actions: [
        { content: 'Go Home', url: '/dist' },
        { content: 'About', url: '/dist/about' }
      ]
    }
  ];

  useEffect(() => {
    const path = new URL(window.location).pathname;
    const title = titles[path] || '404';
    setPageTile(title);
  }, [])

  return (
    <PolarisProvider i18n={translations}>
      <BrowserRouter>
        <AppBridgeProvider
          config={{
            apiKey: config.SHOPIFY_API_KEY,
            host: new URL(window.location).searchParams.get("host"),
            forceRedirect: true,
          }}
        >
          <NavigationMenu
            navigationLinks={[
              {
                label: 'Home',
                destination: '/dist',
              },
              {
                label: 'About',
                destination: '/dist/about',
              }
            ]}
          />
          <TitleBar
            title={pageTitle}
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
            actionGroups={actionGroups}
          />
          <MyProvider>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/dist" element={<HomePage />} />
              <Route path="/dist/about" element={<About />} />
              <Route path="/dist/help" element={<Help />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </MyProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}

function MyProvider({ children }) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
