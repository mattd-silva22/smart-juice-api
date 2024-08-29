FROM postgres:latest

ENV POSTGRES_USER postgres
ENV POSTGRES_DB smart_juice_db
ENV POSTGRES_PASSWORD root

COPY init.sql /docker-entrypoint-initdb.d/