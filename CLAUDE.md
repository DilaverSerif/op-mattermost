# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an OpenProject integration for Mattermost that enables users to:
- Log time entries for work packages
- Create and delete work packages  
- View time logs and delete time log entries
- Subscribe to OpenProject notifications in Mattermost channels

The integration uses slash commands (starting with `/op`) to interact with both OpenProject and Mattermost APIs.

## Development Commands

### Setup and Installation
- `npm install` - Install dependencies
- `sh configure.sh` - Interactive script to create `.env` file with required environment variables
- `npm start` - Start the application (runs on port 3000 by default)

### Testing
- `npm test` - Run tests using Mocha
- Tests are located in `test/utilTest.js`

### Environment Variables Required
The application requires these environment variables (configured via `.env` file):
- `OP_URL` - OpenProject API URL (default: http://localhost:8080/api/v3/)
- `INT_URL` - Integration URL (default: http://localhost:3000/)  
- `MM_URL` - Mattermost API URL (default: http://localhost:8065/api/v4/)
- `MATTERMOST_SLASH_TOKEN` - Mattermost slash command token
- `MATTERMOST_BOT_TOKEN` - Mattermost bot access token
- `OP_ACCESS_TOKEN` - OpenProject API access token

## Architecture

### Entry Point
- `index.js` - Express server setup and main entry point
- Loads routes from `resource/routes.js`
- Runs on port 3000 (or PORT environment variable)

### Core Components
- `resource/routes.js` - Express routes and request handling
- `resource/uiActions.js` - Main UI action handlers (class: UIactions)
- `resource/util.js` - Utility functions and message constants (class: Util)
- `resource/message.js` - Mattermost messaging functionality

### Key Classes
- **UIactions** - Handles all slash command operations and API interactions
- **Util** - Contains utility methods and predefined message strings
- **Message** - Manages communication with Mattermost API

### Dependencies
- Express.js for web server
- Axios for HTTP requests (updated to v1.11.0)
- Moment.js for date/time handling
- dotenv for environment configuration (updated to v16.4.7)
- express-rate-limit for rate limiting (updated to v7.5.0)

## Slash Commands
- `/op` - Main menu
- `/op lt` - Log time
- `/op cwp` - Create work package  
- `/op tl` - View time logs
- `/op dwp` - Delete work package
- `/op dtl` - Delete time log
- `/op sub` - Subscribe to notifications

## Recent Updates & Bug Fixes (2025)
- Updated all dependencies to latest stable versions
- Fixed syntax error (missing semicolon in routes.js:159)
- Improved rate limiting configuration for express-rate-limit v7+
- Fixed OpenProject API work package assignee structure
- Added environment variable validation on startup
- Enhanced error handling and input validation
- Added proper Content-Type headers for API requests

## Mattermost Compatibility
- Uses Mattermost API v4 (current stable version)
- Compatible with Mattermost Server v10.x
- All endpoints tested against current API specification

## External Dependencies
- OpenProject (running on port 8080)
- Mattermost (running on port 8065)
- Requires custom "billable hours" field in OpenProject work packages