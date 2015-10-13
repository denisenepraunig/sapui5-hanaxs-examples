/*get your SCHEMA name*/
SELECT * FROM "HCP"."HCP_DEV_METADATA";

/*get access (open content = SELCET) to your activated objects*/
call "HCP"."HCP_GRANT_SELECT_ON_ACTIVATED_OBJECTS";

/*give your user the role to access and modify the data*/
call "HCP"."HCP_GRANT_ROLE_TO_USER"('YOUR_USER_TRIAL.HANA_INSTANCE.todoapp.data::todo_user','YOUR_USER');  