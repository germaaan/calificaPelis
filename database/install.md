#!/bin/bash

sudo apt-get install postgresql postgresql-contrib
sudo su - postgres
cd /home/germaaan/proyectos/calificaPelis/database
psql -U postgres -f db_create.sql
exit
