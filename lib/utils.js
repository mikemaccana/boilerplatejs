// Helper functions

define(['fs'], function (fs) {

  // How long for browsers to wait if the server doesn't respond to our request for messages. In ms.
  var SSE_ERROR_RETRY = 5000;

  // Message ID used for server sent events
  var messageID = 0;

  // Fail and exit if a critical error occurs
  var die = function(reason) {
    console.log(reason);
    process.exit(1);
  };

  // Die if err is defined
  var dieIfError = function(err) {
    if ( err ) {
      console.log('Error:');
      die(err);
    }
  };

  // Finish the response by rendering templateName with contents
  var respondWithTemplate = function(response, templateName, partials, contents) {
    response.locals = contents;
    return response.render(
      templateName,
      {
        partials: partials
      }
    );
  }

  // Finish the response with some JSON
  var respondWithJSON = function(response, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data))
  }

  // Send some data on the response as an SSE stream (using JSON for the data)
  // See http://www.html5rocks.com/en/tutorials/eventsource/basics/
  var respondWithStream = function(response, data, comment) {
    var responseContents = {
      id: messageID,
      retry: SSE_ERROR_RETRY,
      data: JSON.stringify(data)
    }
    var responseContentsFlattened = '';
    if ( comment ) {
      responseContentsFlattened += ':'+comment+'\n';
    }
    for ( var key in responseContents ) {
      responseContentsFlattened += key+': '+responseContents[key]+'\n';
    }
    response.write(responseContentsFlattened += '\n'); // Not end.
    messageID += 1;
  }

  // Expand ~ to home dir for current user
  var expandHomeDir = function(string) {
    return string.replace('~', process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'])
  }

  return {
    respondWithTemplate:respondWithTemplate,
    respondWithJSON:respondWithJSON,
    respondWithStream:respondWithStream,
    expandHomeDir:expandHomeDir
  }
})