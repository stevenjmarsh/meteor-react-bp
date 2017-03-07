/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import {
  storiesOf,
} from "@kadira/storybook";
import Home from "../../Home";
import Support from "../../Support";
import PrivacyPolicy from "../../PrivacyPolicy";

storiesOf("Pages", module)
  .add("home", () => (<Home />))
  .add("support", () => (<Support />))
  .add("privacy policy", () => (<PrivacyPolicy />));
