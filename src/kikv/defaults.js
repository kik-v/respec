// @ts-check
/**
 * Sets the defaults for kikv specs
 */
export const name = "kikv/defaults";
import { coreDefaults } from "../core/defaults.js";
import linter from "../core/linter.js";
import { rule as privsecSectionRule } from "../core/linter-rules/privsec-section.js";

linter.register(privsecSectionRule);

const licenses = new Map([
  [
    "cc0",
    {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
  ],
  [
    "cc-by",
    {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
    },
  ],
  [
    "cc-by-sa",
    {
      name:
        "Creative Commons Attribution-ShareAlike 4.0 International Public License",
      short: "CC-BY-SA",
      url: "https://creativecommons.org/licenses/by-sa/4.0/legalcode",
    },
  ],
]);

const kikvDefaults = {
  format: "markdown",
  isED: false,
  isNoTrack: true,
  isPR: false,
  lint: {
    "privsec-section": true,
    "wpt-tests-exist": false,
  },
  logos: [],
  prependW3C: false,
  doJsonLd: false,
  license: "cc-by",
  shortName: "X",
  showPreviousVersion: false,
};

function computeProps(conf) {
  return {
    licenseInfo: licenses.get(conf.license),
  };
}

export function run(conf) {
  // assign the defaults
  const lint =
    conf.lint === false
      ? false
      : {
          ...coreDefaults.lint,
          ...kikvDefaults.lint,
          ...conf.lint,
        };
  Object.assign(conf, {
    ...coreDefaults,
    ...kikvDefaults,
    ...conf,
    lint,
  });

  // computed properties
  Object.assign(conf, computeProps(conf));
}
