param (
    [int]$Port = 3000,
    [string]$Root = $PSScriptRoot,
    [switch]$Open
)

if (-not $Root) {
    $Root = $PWD.Path
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

$ip = [System.Net.IPAddress]::Loopback
$listener = New-Object System.Net.Sockets.TcpListener($ip, $Port)

try {
    $listener.Start()
    $url = "http://localhost:$Port"
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  Servidor HOPE activo en: $url" -ForegroundColor Cyan
    Write-Host "  Directorio raiz: $Root" -ForegroundColor DarkGray
    Write-Host "  Presiona Ctrl + C en esta ventana para detenerlo." -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Green

    if ($Open) {
        Start-Process $url
    }

    while ($true) {
        $client = $null
        try {
            $client = $listener.AcceptTcpClient()
            $client.ReceiveTimeout = 4000
            $client.SendTimeout = 4000

            $stream = $client.GetStream()
            $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)

            $requestLine = $reader.ReadLine()
            if (-not $requestLine) {
                if ($client) { $client.Close() }
                continue
            }

            # Leer cabeceras restantes
            while ($line = $reader.ReadLine()) {
                if ([string]::IsNullOrWhiteSpace($line)) { break }
            }

            $parts = $requestLine.Split(" ")
            if ($parts.Length -ge 2) {
                $rawPath = [System.Uri]::UnescapeDataString($parts[1].Split("?")[0])
                if ($rawPath -eq "/" -or [string]::IsNullOrWhiteSpace($rawPath)) {
                    $rawPath = "/index.html"
                }

                $cleanPath = $rawPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
                $filePath = Join-Path $Root $cleanPath

                if (Test-Path $filePath -PathType Leaf) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $contentType = "application/octet-stream"
                    if ($mimeTypes.ContainsKey($ext)) {
                        $contentType = $mimeTypes[$ext]
                    }

                    $contentBytes = [System.IO.File]::ReadAllBytes($filePath)
                    $header = "HTTP/1.1 200 OK`r`n" +
                              "Content-Type: $contentType`r`n" +
                              "Content-Length: $($contentBytes.Length)`r`n" +
                              "Access-Control-Allow-Origin: *`r`n" +
                              "Cache-Control: no-cache`r`n" +
                              "Connection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)

                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($contentBytes, 0, $contentBytes.Length)
                    $stream.Flush()
                } else {
                    $notFound = "HTTP/1.1 404 Not Found`r`nContent-Length: 9`r`nConnection: close`r`n`r`nNot Found"
                    $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                    $stream.Write($notFoundBytes, 0, $notFoundBytes.Length)
                    $stream.Flush()
                }
            }
        } catch {
            # Ignorar errores de desconexión temprana del cliente para que el servidor nunca se caiga
        } finally {
            if ($client) {
                try { $client.Client.Shutdown([System.Net.Sockets.SocketShutdown]::Both) } catch {}
                try { $client.Close() } catch {}
            }
        }
    }
} catch {
    Write-Host "Error al iniciar el servidor en el puerto $Port : $_" -ForegroundColor Red
} finally {
    try { $listener.Stop() } catch {}
    Write-Host "`nServidor detenido." -ForegroundColor Yellow
}
