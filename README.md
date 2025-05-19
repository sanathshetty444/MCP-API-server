# MCP API Server

This is a server implementation that uses the Model Context Protocol (MCP) with two different transport mechanisms:

1. Server-Sent Events (SSE)
2. Streamable HTTP

Both implementations enable real-time communication between clients and models using the Model Context Protocol.

## Overview

This project provides two distinct server implementations:

### SSE Server (`src/sse/index.ts`)

-   Uses Server-Sent Events for persistent, real-time communication
-   Manages multiple client sessions with unique session IDs
-   Provides bidirectional communication (SSE for downstream, HTTP POST for upstream)

### HTTP Stream Server (`src/httpStream/index.ts`)

-   Uses Streamable HTTP transport for communication
-   Simpler implementation with a single transport instance
-   Uses UUID for session generation

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd MCP-API-server
npm install
```

## Required Dependencies

This project requires:

-   Express
-   Model Context Protocol SDK (`@modelcontextprotocol/sdk`)
-   Node.js crypto module (for UUID generation in HTTP Stream)

## Running the Servers

Refer to the scripts in `package.json` for specific run commands. Typically:

```bash
# To run the SSE server
npm run start:sse

# To run the HTTP Stream server
npm run start:http-stream
```

Both servers will launch on port 3000 by default.

## API Endpoints

### SSE Server

#### SSE Connection

`GET /connect`

-   Establishes an SSE connection with the server
-   The server assigns a unique session ID
-   Automatically begins sending example messages

#### Send Messages (SSE)

`POST /messages?sessionId=YOUR_SESSION_ID`

-   Send messages to the server
-   Requires a valid session ID as a query parameter

### HTTP Stream Server

#### Send Messages (HTTP Stream)

`POST /messages?sessionId=YOUR_SESSION_ID`

-   Send messages to the server
-   Requires a valid session ID as a query parameter
-   Uses the Streamable HTTP transport for handling requests

## Testing with Claude AI

To use these servers with Claude AI, add the following to your Claude configuration:

```json
# For SSE server
"greet": {
    "command": "npx",
    "args": ["mcp-remote", "http://localhost:3000/connect"]
}

# For HTTP Stream server (adjust endpoint as needed)
"greet": {
    "command": "npx",
    "args": ["mcp-remote", "http://localhost:3000/messages"]
}
```

## Implementation Details

### SSE Server

-   Maintains a dictionary of transports indexed by session ID
-   Provides example message streaming functionality
-   Handles connection cleanup on client disconnect

### HTTP Stream Server

-   Uses a single transport instance for all clients
-   Generates random UUIDs for session IDs
-   Simpler implementation focused on HTTP streaming

## Error Handling

Both servers include basic error handling for:

-   Invalid session IDs
-   Missing transports
-   Connection errors

## License

[Add your license information here]
