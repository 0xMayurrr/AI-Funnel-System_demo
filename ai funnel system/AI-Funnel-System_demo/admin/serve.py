import http.server
import socketserver
import webbrowser
import os

PORT = 8090
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}/login.html"
            print(f"============================================================")
            print(f" Buildicy Admin Panel")
            print(f" Prepared by Buildicy — AI Growth Systems Studio")
            print(f"============================================================")
            print(f" Serving live at: {url}")
            print(f" Press Ctrl+C to stop the server.")
            print(f"============================================================")
            webbrowser.open(url)
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 98 or e.errno == 10048:
            alt_port = 8091
            print(f"Port {PORT} in use, trying {alt_port}...")
            with socketserver.TCPServer(("", alt_port), Handler) as httpd:
                url = f"http://localhost:{alt_port}/login.html"
                print(f" Serving live at: {url}")
                webbrowser.open(url)
                httpd.serve_forever()
        else:
            raise

if __name__ == "__main__":
    start_server()
