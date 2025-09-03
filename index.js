/*
    op-mattermost provides an integration for Mattermost and Open Project.
    Copyright (C) 2020 to present , Girish M

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>

*/

'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

// Check for required environment variables
const requiredEnvVars = ['OP_URL', 'MM_URL', 'INT_URL', 'MATTERMOST_SLASH_TOKEN', 'MATTERMOST_BOT_TOKEN', 'OP_ACCESS_TOKEN'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please run "sh configure.sh" or set them manually in .env file');
  process.exit(1);
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

require('./resource/routes')(app, axios);