# Readme

## App info
This is a Todo app with CRUD support for XSODATA with the SAPUI5 OData Model version 2.

### App package name
The app is called *todoapp*. Please make sure to create the same package name or replace it with your package name.

## App creation
When you copy and paste the files please do it in the follwing order - and also do the replacements (HANA_INSTANCE, ...)
1. create the .xsaccess, .xsapp and .xsprivileges files and index.html
1. create the webapp folder, create the files inside
1. create the data folder, create todo.hdbtable and after that todo_user.hdbrole
1. create the odata folder and the todo.xsodata

At the end execute the queries:
/*get access (open content = SELCET) to your activated objects*/
call "HCP"."HCP_GRANT_SELECT_ON_ACTIVATED_OBJECTS";

/*give your user the role to access and modify the data*/
call "HCP"."HCP_GRANT_ROLE_TO_USER"('YOUR_USER_TRIAL.HANA_INSTANCE.todoapp.data::todo_user','YOUR_USER'); 

## Replacements
When copy-pasting the files please replace the following values with your data.

### HANA instance
Replace *HANA_INSTANCE* with your HANA instance name.

### NEO-Schema
Replace *YOUR_NEO_SCHEMA* with your NEO-Schema.
Get your SCHEMA with: SELECT * FROM "HCP"."HCP_DEV_METADATA"

### Trial User
Replace *YOUR_USER_TRIAL* with your trial user - for example: p123456trial

### User
Replace *YOUR_USER* with your user - for example: p123456