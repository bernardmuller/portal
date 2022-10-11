import express from "express";
import httpProxy from "http-proxy";
const app = express();
var apiProxy = httpProxy.createProxyServer();
var serverOne = "https://munchiesbackend-production.up.railway.app/";

app.all("/munchies/*", function (req, res) {
	apiProxy.web(req, res, { target: serverOne });
});

const port = 8080;

app.listen(port, () => {
	console.log("Server listening on port " + port);
});
