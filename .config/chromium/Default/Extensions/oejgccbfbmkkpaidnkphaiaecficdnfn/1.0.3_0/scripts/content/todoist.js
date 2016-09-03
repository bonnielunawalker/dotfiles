/*jslint indent: 2 plusplus: true*/
/*global $: false, togglbutton: false*/

'use strict';

togglbutton.render('.task_item .content:not(.toggl)', {observe: true}, function (elem) {
  var link, descFunc, projectFunc, container = $('.text', elem),
    description, project;

  descFunc = function () {
    var clone = container.cloneNode(true),
      i = 0,
      child = null;

    while (clone.children.length > i) {
      child = clone.children[i];
      if (child.tagName === "B"
          || child.tagName === "I"
          || child.tagName === "STRONG"
          || child.tagName === "EM") {
        i++;
      } else if (child.tagName === "A") {
        if (child.classList.contains("ex_link")
            || child.getAttribute("href").indexOf("mailto:") === 0) {
          i++;
        } else {
          child.remove();
        }
      } else {
        child.remove();
      }
    }

    return clone.textContent.trim();
  };

  projectFunc = function () {
    var projectElem, projectLabel;
    projectElem = $('.project_link');
    if (projectElem) {
      return projectElem.textContent.trim();
    }
    projectLabel = $('.pname', elem.parentNode.parentNode);
    if (projectLabel) {
      return projectLabel.textContent.trim();
    }
  };

  description = descFunc();
  project = projectFunc();

  link = togglbutton.createTimerLink({
    className: 'todoist',
    description: description,
    projectName: project
  });

  container.insertBefore(link, container.lastChild);
});
