BEGIN;
--
CREATE ROLE ra_app_user LOGIN PASSWORD 'app_password';
CREATE ROLE ra_super_user LOGIN PASSWORD 'super_password';
--
ALTER USER ra_super_user WITH SUPERUSER;
ALTER USER ra_super_user WITH CREATEDB;
ALTER USER ra_super_user WITH BYPASSRLS;
--
ALTER USER ra_app_user WITH NOCREATEDB;
ALTER USER ra_app_user WITH NOCREATEROLE;
ALTER USER ra_app_user WITH NOREPLICATION;
ALTER USER ra_app_user WITH NOBYPASSRLS;
-- 
GRANT ra_app_user TO ra_super_user;

COMMIT;

