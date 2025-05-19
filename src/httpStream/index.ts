import express, { Request, Response } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { server } from "../mcp";
import { randomUUID } from "crypto";

const app = express();
app.use(express.json());

const router = express.Router();

const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
});
server.connect(transport);
// endpoint for the client to use for sending messages
const POST_ENDPOINT = "/messages";

router.post(POST_ENDPOINT, async (req: Request, res: Response) => {
    console.log("message request received: ", req.body);

    const sessionId = req.query.sessionId;

    if (typeof sessionId != "string") {
        res.status(400).send({ messages: "Bad session id." });
        return;
    }

    if (!transport) {
        res.status(400).send({ messages: "No transport found for sessionId." });
        return;
    }

    await transport.handleRequest(req, res, req.body);

    return;
});

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`MCP Streamable HTTP Server listening on port ${PORT}`);
});
