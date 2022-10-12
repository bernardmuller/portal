import express from "express";
import httpProxy from "http-proxy";
const app = express();
var apiProxy = httpProxy.createProxyServer();
var serverOne = "https://munchiesbackend-production.up.railway.app/";

app.all("/munchies/*", function (req, res) {
	console.log("munchies");
	try {
		apiProxy.web(req, res, { target: serverOne });
	} catch (error) {
		console.log(error);
	}
});

const port = 8080;

app.listen(port, () => {
	console.log("Server listening on port " + port);
});
