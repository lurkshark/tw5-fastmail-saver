/*\
title: $:/plugins/lurkshark/fastmail-saver/js/saver.js
type: application/javascript
module-type: saver

A bare bones saver for Fastmail websites.

\*/
(function(){

  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";
  
  /*
  Select the appropriate saver module and set it up
  */
  var FastmailSaver = function(wiki) {
    this.wiki = wiki;
  };
  
  FastmailSaver.prototype.save = function(text, method, callback) {
    if ($tw.wiki.getTiddlerText("$:/plugins/lurkshark/fastmail-saver/config/Enabled") === "no") return false;
    
    var boundary = "---------------------------123041454729211";
    var data = [
      "--" + boundary,
      "Content-Disposition: form-data; name=\"fileselect\"; filename=\"index.html\"",
      "Content-Type: text/html; charset=UTF-8\r\n",
      text,
      "--" + boundary,
      "Content-Disposition: form-data; name=\"newname\"\r\n\r\nindex.html",
      "--" + boundary,
      "Content-Disposition: form-data; name=\"doupload\"\r\n\r\nUpload File",
      "--" + boundary + "--\r\n"
    ].join("\r\n");

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        callback(null);
      }
    };
    xhr.open('POST', window.location.origin + window.location.pathname);
    xhr.setRequestHeader("Content-Type","multipart/form-data; charset=UTF-8; boundary=" + boundary);
    xhr.send(data);
    return true;
  };
  
  /*
  Information about this saver
  */
  FastmailSaver.prototype.info = {
    name: "fastmail",
    priority: 5000,
    capabilities: ["save", "autosave"]
  };
  
  /*
  Static method that returns true if this saver is capable of working
  */
  exports.canSave = function(wiki) {
    return true;
  };
  
  /*
  Create an instance of this saver
  */
  exports.create = function(wiki) {
    return new FastmailSaver(wiki);
  };
  
  })();
  