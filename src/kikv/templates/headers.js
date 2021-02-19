// @ts-check
import { getIntlData, showWarning } from "../../core/utils.js";
import { html } from "../../core/import-maps.js";
import showLink from "../../core/templates/show-link.js";
import showLogo from "../../core/templates/show-logo.js";
import showPeople from "../../core/templates/show-people.js";

const name = "kikv/templates/headers";

const ccLicense = "https://creativecommons.org/licenses/by/4.0/legalcode";

const localizationStrings = {
  en: {
    author: "Author:",
    authors: "Authors:",
    editor: "Editor:",
    editors: "Editors:",
    former_editor: "Former editor:",
    former_editors: "Former editors:",
    latest_editors_draft: "Latest editor's draft:",
    latest_published_version: "Latest published version:",
    this_version: "This version:",
  },
  nl: {
    author: "Auteur:",
    authors: "Auteurs:",
    editor: "Redacteur:",
    editors: "Redacteurs:",
    latest_editors_draft: "Laatste werkversie:",
    latest_published_version: "Laatst gepubliceerde versie:",
    this_version: "Deze versie:",
  }
};

export const l10n = getIntlData(localizationStrings);

function getSpecSubTitleElem(conf) {
  let specSubTitleElem = document.querySelector("h2#subtitle");

  if (specSubTitleElem && specSubTitleElem.parentElement) {
    specSubTitleElem.remove();
    conf.subtitle = specSubTitleElem.textContent.trim();
  } else if (conf.subtitle) {
    specSubTitleElem = document.createElement("h2");
    specSubTitleElem.textContent = conf.subtitle;
    specSubTitleElem.id = "subtitle";
  }
  if (specSubTitleElem) {
    specSubTitleElem.classList.add("subtitle");
  }
  return specSubTitleElem;
}

export default conf => {
  return html`<div class="head">
    ${conf.logos.map(showLogo)} ${document.querySelector("h1#title")}
    ${getSpecSubTitleElem(conf)}
    <h2>
      ${conf.textStatus}
      <time class="dt-published" datetime="${conf.dashDate}"
        >${conf.publishHumanDate}</time
      >
    </h2>
    <dl>
      <dt>${conf.multipleEditors ? l10n.editors : l10n.editor}</dt>
      ${showPeople(conf.editors)}
      ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0
        ? html`
            <dt>
              ${conf.multipleFormerEditors
                ? l10n.former_editors
                : l10n.former_editor}
            </dt>
            ${showPeople(conf.formerEditors)}
          `
        : ""}
      ${conf.authors
        ? html`
            <dt>${conf.multipleAuthors ? l10n.authors : l10n.author}</dt>
            ${showPeople(conf.authors)}
          `
        : ""}
      ${conf.otherLinks ? conf.otherLinks.map(showLink) : ""}
    </dl>
    ${renderCopyright(conf)}
    <hr />
  </div>`;
};

/**
 * @param {string} text
 * @param {string} url
 * @param {string=} cssClass
 */
function linkLicense(text, url, cssClass) {
  return html`<a rel="license" href="${url}" class="${cssClass}">${text}</a>`;
}

function renderCopyright(conf) {
  // If there is already a copyright, let's relocate it.
  const existingCopyright = document.querySelector(".copyright");
  if (existingCopyright) {
    existingCopyright.remove();
    return existingCopyright;
  }
  if (conf.hasOwnProperty("overrideCopyright")) {
    const msg = "The `overrideCopyright` configuration option is deprecated.";
    const hint = 'Please use `<p class="copyright">` instead.';
    showWarning(msg, name, { hint });
  }
  return conf.overrideCopyright
    ? [conf.overrideCopyright]
    : html`<p class="copyright">
        De inhoud van dit document is beschikbaar onder
        ${linkLicense(
          "Creative Commons Attribution 4.0 International Public License",
          ccLicense,
          "subfoot"
        )}.
      </p>`;
}
