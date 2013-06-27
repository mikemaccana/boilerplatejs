// Helper functions

define(['fs', 'hogan'], function (fs, hogan) {
  
  // How long for browsers to wait if the server doesn't respond to our request for messages. In ms.
  var SSE_ERROR_RETRY = 5000;
  
  // Message ID used for server sent events
  var message_id = 0;
  
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

  // Finish the response by rendering template_name with contents
  var respondWithTemplate = function(response, template_name, contents) {
    fs.readFile('templates/'+template_name+'.mustache', 'utf8', function (err, template_data) {
      dieIfError(err);
      var template = hogan.compile(template_data);
      var rendered_template = template.render(contents);
      response.send(rendered_template);
    })  
  }
    
  // Finish the response with some JSON
  var respondWithJSON = function(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data))
  }
  
  // Send some data on the response as an SSE stream (using JSON for the data)
  // See http://www.html5rocks.com/en/tutorials/eventsource/basics/
  var respondWithStream = function(response, data, comment) {
    var response_contents = {
      id: message_id,
      retry: SSE_ERROR_RETRY,
      data: JSON.stringify(data)
    }
    var response_contents_flattened = '';
    if ( comment ) {
      response_contents_flattened += ':'+comment+'\n';
    }
    for ( var key in response_contents ) {
      response_contents_flattened += key+': '+response_contents[key]+'\n';
    }
    response.write(response_contents_flattened += '\n'); // Not end.
    message_id += 1;
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