param (
    [int]$Port = 3000,
    [string]$Root = "C:\Users\maig0\.gemini\antigravity\scratch\hope"
)

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".json" = "application/json"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".ico"  = "image/x-icon"
}

$ip = [System.Net.IPAddress]::Loopback
$listener = New-Object System.Net.Sockets.TcpListener($ip, $Port)

try {
    $listener.Start()
    Write-Host "=========================================================="
    Write-Host " Servidor HOPE iniciado en http://localhost:$Port"
    Write-Host " Directorio raiz: $Root"
    Write-Host " Presiona Ctrl+C para detener."
    Write-Host "=========================================================="

    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        
        $requestLine = $reader.ReadLine()
        if (-not $requestLine) {
            $client.Close()
            continue
        }

        # Read remainder of headers
        while ($line = $reader.ReadLine()) {
            if ($line.Trim() -eq "") { break }
        }

        $parts = $requestLine.Split(" ")
        if ($parts.Length -ge 2) {
            $urlPath = $parts[1].Split("?")[0]
            if ($urlPath -eq "/" -or $urlPath -eq "") {
                $urlPath = "/index.html"
            }

            # Map to filesystem
            $cleanPath = $urlPath.TrimStart("/").Replace("/", "\")
            $filePath = Join-Path $Root $cleanPath

            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = "application/octet-stream"
                if ($mimeTypes.ContainsKey($ext)) {
                    $contentType = $mimeTypes[$ext]
                }

                $contentBytes = [System.IO.File]::ReadAllBytes($filePath)
                $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($contentBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
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

        $client.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "Servidor detenido."
}
