BEGIN;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS postgis;
DROP SCHEMA IF EXISTS app_public CASCADE;
CREATE SCHEMA app_public;
GRANT usage ON SCHEMA app_public TO ra_app_user;

CREATE TABLE app_public.locations (
    id serial PRIMARY KEY,
    name text,
    location Geometry(Point, 4326)

    -- poly Geometry(Polygon, 4326),
    -- bounds Geometry(GeometryCollection, 4326),
);

CREATE TABLE app_public.events (
    id serial PRIMARY KEY,
    name text,
    description text,
    time_required interval
);

-- TODO create example using column select grants plugin...
-- GRANT SELECT (id, username, email, poly, latlng, bounds) ON TABLE app_public.users TO ra_app_user;
-- GRANT UPDATE (username, email, PASSWORD) ON TABLE app_public.users TO ra_app_user;

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE app_public.events TO ra_app_user;
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE app_public.locations TO ra_app_user;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA app_public TO ra_app_user;
COMMIT;

