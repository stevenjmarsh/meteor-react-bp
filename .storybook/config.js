import { configure, addDecorator } from "@kadira/storybook";
import { withKnobs } from "@kadira/storybook-addon-knobs";
import backgrounds from "react-storybook-addon-backgrounds";

import "!style!css!less!../client/stylesheets/main.less";

// load settings as a Meteor application would (for API keys)
Window.Meteor = {};
try {
  Window.Meteor.settings = require("../settings.json");
} catch (e) {
  Window.Meteor.settings = "";
}

addDecorator(withKnobs);
addDecorator(backgrounds([
  { name: "Light Steel Blue", value: "lightsteelblue" },
  { name: "EDH Gradient", value: "-webkit-linear-gradient(-45deg, #048ec5 0%, #2ecc71 100%)" },
]));


const req = require.context("../imports/ui", true, /__stories__\/.*.stories.jsx?/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
