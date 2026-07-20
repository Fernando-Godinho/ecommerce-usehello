import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean logs to keep it readable
        sys.stderr.write("%s - - [%s] %s\n" %
                         (self.address_string(),
                          self.log_date_time_string(),
                          format%args))

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("==================================================")
            print(f"🚀 Servidor da Use Hello rodando localmente!")
            print(f"🔗 URL: http://localhost:{PORT}")
            print("==================================================")
            print("Pressione CTRL+C para encerrar o servidor.")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Servidor encerrado.")
        sys.exit(0)
    except Exception as e:
        print(f"Erro ao iniciar o servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_server()
