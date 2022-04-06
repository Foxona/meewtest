import * as React from "react";
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  PasswordInput,
} from "react-admin";
import { Create, SimpleForm, TextInput, Login } from "react-admin";

import dataProvider from "../utils/dataprov";
import authProvider from "../utils/authprov";
const clientSide = typeof window !== "undefined";

const apiUrl = "https://ryikku.meew.me";


const httpClient = async (url: string, options: RequestInit = {}) => {
  options.headers = new Headers({
    ...options.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
    "user-jwt": clientSide && localStorage.getItem("token") || "",
  });
  const res = await fetch(url, options);
  const j = (await res.json()) as any[];
  return { json: j };
};
export const StationCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput multiline source="comment" />
    </SimpleForm>
  </Create>
);
export const UserCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="login" />
      <TextInput source="name" />
      <TextInput multiline source="comment" />
      <PasswordInput multiline source="password" />
    </SimpleForm>
  </Create>
);
const App = () =>
  !clientSide ? (
    <div />
  ) : (
    <Admin
      dataProvider={dataProvider(apiUrl, httpClient)}
      authProvider={authProvider}
      loginPage={Login}
    >
      <Resource
        name="users"
        list={ListGuesser}
        edit={EditGuesser}
        create={UserCreate}
      />
      <Resource
        name="stations"
        list={ListGuesser}
        edit={EditGuesser}
        create={StationCreate}
      />
    </Admin>
  );

export default App;
