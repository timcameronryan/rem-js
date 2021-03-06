// Generated by CoffeeScript 1.3.1
(function() {
  var dbox, example, fs, keys, oauth, read, rem;

  rem = require('../rem');

  fs = require('fs');

  read = require('read');

  keys = JSON.parse(fs.readFileSync(__dirname + '/keys.json'));

  dbox = rem.load('dropbox', '1', {
    key: keys.dropbox.key,
    secret: keys.dropbox.secret
  });

  oauth = rem.oauth(dbox);

  oauth.start(function(url, token, secret) {
    console.log("Visit:", url);
    return read({
      prompt: "Hit enter when finished..."
    }, function() {
      return oauth.complete(token, secret, example);
    });
  });

  example = function(err, user) {
    if (err) {
      console.log(err);
      return;
    }
    user('files_put/sandbox/REM.txt').put('text/plain', 'REM is hiding in your dropcube', function(err, json) {
      console.log('PUT file: (error', err, ')');
      return console.log(json);
    });
    return user('metadata/sandbox/').get(function(err, json) {
      var f, _i, _len, _ref, _results;
      console.log('Sandbox contents: (error', err, ')');
      _ref = json != null ? json.contents : void 0;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        _results.push(console.log(' -', f.path));
      }
      return _results;
    });
  };

}).call(this);
