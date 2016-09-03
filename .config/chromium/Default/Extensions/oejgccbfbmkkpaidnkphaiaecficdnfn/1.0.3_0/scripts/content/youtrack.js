/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/
'use strict';

/* the first selector is required for youtrack-5 and the second for youtrack-6 */
togglbutton.render('.fsi-toolbar-content:not(.toggl), .toolbar_fsi:not(.toggl)', {observe: true}, function (elem) {


  var link, description,
    numElem = $('a.issueId'),
    titleElem = $(".issue-summary"),
    projectElem = $('.fsi-properties .disabled.bold');

  description = titleElem.textContent;
  description = numElem.firstChild.textContent.trim() + " " + description.trim();

  link = togglbutton.createTimerLink({
    className: 'youtrack',
    description: description,
    projectName: projectElem ? projectElem.textContent : ''
  });

  elem.insertBefore(link, titleElem);
});


// Agile board
togglbutton.render('#board .sb-task:not(.toggl)', {observe: true}, function (elem) {
  var link,
    container = $('.sb-task-title', elem),
    description = $('.sb-task-summary', elem).textContent,
    projectName = $('#selectAgile').value.split("(")[1].replace(")", "").trim();

  link = togglbutton.createTimerLink({
    className: 'youtrack',
    description: description,
    projectName: projectName
  });

  container.appendChild(link);
});