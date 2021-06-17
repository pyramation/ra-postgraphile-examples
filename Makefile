
init:
	PGUSER=ra_super_user PGPASSWORD=super_password psql exampledb < ./server/sql/schema.sql

roles:
	psql < ./server/sql/roles.sql

drop-roles:
	psql < ./server/sql/drop-roles.sql

clean:
	psql exampledb < ./server/sql/clean.sql

up:
	docker-compose up

down:
	docker-compose down -v

