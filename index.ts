import express from "express";
import httpProxy from "express-http-proxy";
const app = express();
var serverOne = "https://munchiesbackend-production.up.railway.app/";

app.get("/", function (req, res) {
	res.send("bernardmuller.dev api portal");
});

app.use("/munchies/*", httpProxy(serverOne));

const port = 8080;

app.listen(port, () => {
	console.log("Server listening on port " + port);
});
