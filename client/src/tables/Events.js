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

export const EventList = (props) => {
  return (
    <List {...props} >
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="time_required" />
        <EditButton basePath="/events" />
      </Datagrid>
    </List>
  );
};

const EventTitle = ({ record }) => {
  return <span>Event {record ? `"${record.name}"` : ""}</span>;
};

export const EventEdit = (props) => {
  return (
    <Edit title={<EventTitle />} {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="time_required" />
      </SimpleForm>
    </Edit>
  );
};

export const EventCreate = (props) => {
  return (
    <Create title="Create an Event" {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="time_required" />
      </SimpleForm>
    </Create>
  );
};
