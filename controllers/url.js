const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "Url is required" });

  const shortID = shortid.generate();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  // console.log("short id", shortID);
  return res.render("home", { id: shortID });
};

const handleRedirectOriginalUrl = async (req, res) => {
  const shortId = req.params.shortId;
  console.log("looking for short id", shortId);

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    console.log("Looking for entry:", entry);

    if (!entry) {
      return res.status(404).send("Short URL not found.");
    }

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error during URL redirect:", error);
    return res.status(500).send("Internal Server Error.");
  }
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortUrl,
  handleRedirectOriginalUrl,
  handleGetAnalytics,
};
