import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Admin, Resource } from "react-admin";
import { useApolloClient } from "@apollo/react-hooks";
import pgDataProvider from "ra-postgraphile";
import { Loader } from "./Loader";
import TreeMenu from "@bb-tech/ra-treemenu";

import PeopleIcon from "@material-ui/icons/People";
import apolloClient from "./apollo/client";

import { LocationList, LocationEdit, LocationCreate } from "./tables/Locations";
import { EventList, EventEdit, EventCreate } from "./tables/Events";

const ReactAdminWrapper = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    (async () => {
      try {
        const dataProvider = await pgDataProvider(client, {
          typeMap: {
            Interval: {
              expand: true
            },
          },
        });
        setDataProvider(() => dataProvider);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [client]);

  if (!dataProvider) {
    return <Loader />;
  }

  return (
    dataProvider && (
      <Admin dataProvider={dataProvider} menu={TreeMenu} disableTelemetry>
        <Resource
          name="Events"
          options={{ label: "Events" }}
          list={EventList}
          icon={PeopleIcon}
          edit={EventEdit}
          create={EventCreate}
        />
        <Resource
          name="Locations"
          options={{ label: "Locations" }}
          list={LocationList}
          icon={PeopleIcon}
          edit={LocationEdit}
          create={LocationCreate}
        />
      </Admin>
    )
  );
};

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ReactAdminWrapper />
    </ApolloProvider>
  );
};

export default App;
