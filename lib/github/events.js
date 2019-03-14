"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.issues = exports.release = void 0;

var _helpers = require("./helpers");

const release = payload => {
  const {
    release: {
      html_url,
      tag_name,
      author,
      published_at
    },
    repository
  } = payload;
  const authorDetails = (0, _helpers.getAuthorDetails)(author);
  const repoName = repository.name;
  return {
    attachments: [Object.assign({
      fallback: `Release ${tag_name} published for ${repoName}`,
      pretext: `New Release Published for *${repoName}*`,
      color: '#36a64f'
    }, authorDetails, {
      title: `Release ${tag_name}`,
      title_link: html_url,
      ts: Date.parse(published_at) / 1000 // eslint-disable-line no-magic-numbers

    })]
  };
};

exports.release = release;

const issues = payload => {
  const {
    action,
    issue,
    repository
  } = payload;
  const {
    html_url,
    number,
    title,
    user,
    labels,
    state,
    updated_at
  } = issue;
  const authorDetails = (0, _helpers.getAuthorDetails)(user);
  const repoName = repository.name;
  const labelField = {
    title: 'labels',
    value: labels.map(label => label.name).join(', '),
    'short': true
  };
  const stateField = {
    title: 'state',
    value: state,
    'short': true
  };
  const fields = [labelField, stateField];
  return {
    attachments: [Object.assign({
      fallback: `Issue #${number}: ${title}`,
      pretext: `Issue ${action} in *${repoName}*`,
      color: '#36a64f'
    }, authorDetails, {
      title: `Issue #${number}: ${title}`,
      title_link: html_url,
      fields,
      ts: Date.parse(updated_at) / 1000 // eslint-disable-line no-magic-numbers

    })]
  };
};

exports.issues = issues;