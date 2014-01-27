#!/bin/bash

#mongo script.js
mongoimport --db mean-dev --collection talks --file talks.json --jsonArray

