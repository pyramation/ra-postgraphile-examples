import React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
} from "react-admin";
import { Field } from "react-final-form";

import SmallMap from "./components/SmallMap";

export const LocationList = (props) => {
  return (
    <List {...props} >
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="location" />
        <EditButton basePath="/locations" />
      </Datagrid>
    </List>
  );
};

const LocationTitle = ({ record }) => {
  return <span>Location {record ? `"${record.name}"` : ""}</span>;
};

export const LocationEdit = (props) => {
  return (
    <Edit title={<LocationTitle />} {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <Field
          id="location"
          name="location"
          source="location"
          label="Location"
          component={SmallMap}
        />
      </SimpleForm>
    </Edit>
  );
};

export const LocationCreate = (props) => {
  return (
    <Create title="Create a Location" {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <Field
          id="location"
          name="location"
          source="location"
          label="Location"
          component={SmallMap}
        />
      </SimpleForm>
    </Create>
  );
};
