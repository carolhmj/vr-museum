# From: https://stackoverflow.com/questions/59908927/failed-to-load-module-script-the-server-responded-with-a-non-javascript-mime-ty
# Use to create local host
import http.server
import socketserver

PORT = 1337

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    ".js": "application/javascript",
});

httpd = socketserver.TCPServer(("", PORT), Handler)
httpd.serve_forever()