"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/ping', (_req, res) => {
    res.send('pong');
});
const server = (0, http_1.createServer)(app);
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
