// TODO: Read Graphql Schema and Generate Route from Types
// TODO: If Upload - Need to Select File and Drop File Field

import React from "react";
import { loader } from "graphql.macro";
import config from "./config";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "components/Pages/Home";
import Fields from "components/Pages/Fields";

const { ignoreTypes } = config;
const hist = createBrowserHistory();
const query = loader("./schema.graphql");
const filtered = query.definitions.filter(each => {
  return (
    each.kind === "ObjectTypeDefinition" &&
    !each.name.value.startsWith("_") &&
    !ignoreTypes.includes(each.name.value)
  );
});

// const testing = filtered.filter(each => {
//   return each.name.value === "Mutation";
// });

// const fieldTesting = testing[0].fields.filter(each => {
//   return each.name.value === "CreateImage";
// });

// console.log(fieldTesting);

const routes = () => {
  // Render Routes Here
  return (
    <Router history={hist}>
      <Switch>
        {filtered.map(each => {
          const routeName = each.name.value;
          const routePath = `/${routeName.toLowerCase()}`;
          return (
            <Route
              key={routeName}
              path={routePath}
              render={routeData => (
                <Fields {...routeData} name={routeName} fields={each.fields} />
              )}
            />
          );
        })}
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default routes;
