var fs = require('fs');

exports.homeController = function() {
    this.name = "home";

    this.index = function(req, res) {

        fs.readFile('./public/views/home/index.html', 'utf-8', function(error, content) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(content);
        });
    };

    this._iamprivate = function() {
        // this is a private function
    };
};
