const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const { Page } = require("../models");
const wikiPage = require("../views/wikipage");

router.get("/", async (req, res) => {
  res.send("router get wiki page");
});

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", async (req, res) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  // SELECT page FROM pages WHERE slug = whateverTheSlugIs
  const foundPage = await Page.findOne({
    where: {
      slug: req.params.slug
    }
  });
  // console.log(foundPage);

  // res.json(foundPage);
  // console.log("foundPage:", foundPage);
  // res.send(`hit dynamic route at ${req.params.slug}`);
  res.send(wikiPage(foundPage));
});

module.exports = router;
