# Readme

## App info
This is a Todo app with CRUD support for XSODATA with the SAPUI5 OData Model version 2.

The app needs to be hosted inside an HANA instance as an XS-app.

### Slides from my sitWDF talk
[SAPUI5 & HANA XS](https://github.com/denisenepraunig/sap-inside-tracks/tree/master/sitwdf-2015/slides)

### Workshop Material
[Workshop material from EU CodeWeek 2015](http://bit.ly/1REhpIb)

### App package name
The app is called **todoapp**. Please make sure to create the same package name or replace it with your package name.

### App screenshot
![Todo App Screenshot](screenshot_todo.png)

### Folder structure
App hosted inside an HANA instance:

![Todo App Folder Structure](folder_structure_todo.png)

### App creation

When you copy and paste the files please do it in the follwing order - and also do the replacements (HANA_INSTANCE, ...)

* create the .xsaccess, .xsapp and .xsprivileges files and index.html
* create the webapp folder, create the files inside
* create the data folder, create todo.hdbtable and after that todo_user.hdbrole
* create the odata folder and the todo.xsodata

At the end execute the queries (see also **queries.sql** file):

```sql
call "HCP"."HCP_GRANT_SELECT_ON_ACTIVATED_OBJECTS";

call "HCP"."HCP_GRANT_ROLE_TO_USER"('YOUR_USER_TRIAL.HANA_INSTANCE.todoapp.data::todo_user','YOUR_USER');
```

## Replacements
When copy-pasting the files please replace the following values with your data.

### HANA instance
Replace **HANA_INSTANCE** with your HANA instance name.

### NEO-Schema
Replace **YOUR_NEO_SCHEMA** with your NEO-Schema.

Get your SCHEMA with: `SELECT * FROM "HCP"."HCP_DEV_METADATA"`

### Trial User
Replace **YOUR_USER_TRIAL** with your trial user - for example: p123456trial

### User
Replace **YOUR_USER** with your user - for example: p123456