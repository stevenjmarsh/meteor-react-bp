import { css } from "glamor";

/**
 *  Component Style Pattern (use with glamor)
 *
 *  const componentRules = {
 *    rule1: "value",
 *      ...
 *    ruleN: "value",
 *  };
 *  export const componentStyle = {
 *    rules: componentRules,
 *    className: `${css(componentRules)}`,
 *  };
 *
 */

const gradientBackgroundRules = {
  background: [
    "#048ec5",
    "-moz-linear-gradient(-45deg, #048ec5 0%, #2ecc71 100%) fixed",
    "-webkit-linear-gradient(-45deg, #048ec5 0%,#2ecc71 100%) fixed",
    "linear-gradient(135deg, #048ec5 0%,#2ecc71 100%) fixed",
  ],
  /* IE6-9 fallback on horizontal gradient */
  filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#048ec5', endColorstr='#2ecc71',GradientType=1 )",
};

const defaultPageRules = {
  ...gradientBackgroundRules,
  color: "white",
  padding: "30px",
};
export const defaultPageStyle = { // eslint-disable-line import/prefer-default-export
  rules: defaultPageRules,
  className: `${css(defaultPageRules)}`,
};
