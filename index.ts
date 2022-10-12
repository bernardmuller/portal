import express from "express";
import httpProxy from "express-http-proxy";
const app = express();
var serverOne = "https://munchiesbackend-production.up.railway.app/";
var serverOneAPI = "https://munchiesbackend-production.up.railway.app/api";

app.get("/", function (req, res) {
	res.send("bernardmuller.dev api portal");
});

app.use("/munchies", httpProxy(serverOne));
app.use("/munchies/api", httpProxy(serverOneAPI));

const port = 8080;

app.listen(port, () => {
	console.log("Server listening on port " + port);
});
