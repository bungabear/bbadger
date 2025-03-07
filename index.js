const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const openBadge = require("openbadge");
const axios = require("axios");
const xml2js = require("xml2js");
const bsonUtil = require("./util/bson-util.js");
const OpenSansBoldJson = require("./OpenSans-Bold.json");

// for vercel
function extractFont() {
  const targetPath = "/tmp/bbadger/fonts";
  try {
    const stat = fs.statSync(`${targetPath}/OpenSans-Bold.ttf`);
  } catch (e) {
    fs.mkdirSync(targetPath, { recursive: true });
    bsonUtil.loadFileFromJson(
      "./OpenSans-Bold.json",
      `${targetPath}/OpenSans-Bold.ttf`
    );
  }
}

function makeBadge(first, second, firstColor, secondColor) {
  extractFont();
  return new Promise(function (resolve, reject) {
    const color = {};
    if (firstColor) {
      color.left = firstColor;
    }
    if (secondColor) {
      color.right = secondColor;
    }
    // vercel root /tmp path for fonts
    openBadge(
      {
        text: [`${first}`, `${second}`],
        color: color,
        font: { fontFace: "../../../../tmp/bbadger/fonts/OpenSans-Bold.ttf" },
      },
      function (err, badgeSvg) {
        if (err) {
          reject(err);
        } else {
          resolve(badgeSvg);
        }
      }
    );
  });
}

app.get("/", (req, res) => {
  res.redirect("https://github.com/bungabear/bbadger");
});

app.get("/maven", async (req, res) => {
  let url = req.query["url"];
  try {
    if (!url) {
      throw "No url";
    }

    if (!url.endsWith(".xml")) {
      if (!url.endsWith("/")) {
        url = url + "/";
      }
      url = url + "maven-metadata.xml";
    }

    let response = await axios.get(url);
    if (response.status != 200) {
      throw "Status not 200";
    }

    let data = response.data;
    let parser = xml2js.Parser();
    let jso = await parser.parseStringPromise(data);
    let id = jso.metadata.artifactId;
    let version = jso.metadata.versioning[0].release;

    const badge = await makeBadge(id, version);
    res.set("Content-Type", "image/svg+xml");
    res.send(badge);
  } catch (e) {
    console.error(e);
    const badge = await makeBadge("Not", "Found", null, "#d64");
    res.set("Content-Type", "image/svg+xml");
    res.send(badge);
  }
});

app.get("/gather.town", async (req, res) => {
  try {
    const url = req.query["url"];
    const response = await axios.get(url);
    const json = response.data;
    const name = json.name;
    const currnetUserCount = json.roomCount;
    const badge = await makeBadge(name, currnetUserCount);
    res.set("Content-Type", "image/svg+xml");
    res.send(badge);
  } catch (e) {
    const badge = await makeBadge("Not", "Found", null, "#d64");
    res.set("Content-Type", "image/svg+xml");
    res.send(badge);
  }
});

app.listen(port, () => {
  extractFont();
  console.log(`Server listening on port ${port}`);
});
