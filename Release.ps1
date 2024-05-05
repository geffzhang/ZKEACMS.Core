Add-Type -assembly "system.io.compression.filesystem"

[xml]$cmsProj = Get-Content "src/ZKEACMS/ZKEACMS.csproj"
$version = $cmsProj.Project.PropertyGroup[0].FileVersion
Write-Host "Create a new release for version $version ?"
Pause
$releaseFolder = "Release"
Write-Host "This may take a few minutes, please wait..."
if(Test-Path $releaseFolder){
    Remove-Item -Path $releaseFolder -Force -Recurse
}
Invoke-Expression("dotnet restore")
Set-Location src/ZKEACMS.WebHost
Invoke-Expression("dotnet tool restore")
Invoke-Expression("dotnet tool run publish-zkeacms")
Write-Host "Copy application files..."
Set-Location ../../
New-Item -Path "." -Name $releaseFolder -ItemType "directory" -Force
Move-Item -Path "src/ZKEACMS.WebHost/bin/Release/PublishOutput" -Destination "$releaseFolder/Application"
Write-Host "Generate application database..."
New-Item -Path "$releaseFolder/Application" -Name "App_Data" -ItemType "directory"
Set-Location Database/SQLite
Invoke-Expression("sqlite-exec -d ../../$releaseFolder/Application/App_Data/Database.sqlite -f ZKEACMS.sqlite.sql")
Set-Location ../../
Copy-Item -Path "Database/SQLite/appsettings.json" -Destination "$releaseFolder/Application/appsettings.json" -Force
Write-Host "Copy database scripts..."
$dbSource = 'Database'
$dbDestination = "$releaseFolder/Database"
$exclude = @('*.mdf','*.ldf','*.cmd','*.exe','*.dll','*.sh','*.json')
$length =(Get-Item -Path ".\" -Verbose).FullName.Length + $dbSource.Length + 1
Get-ChildItem $dbSource -Recurse -Exclude $exclude | Copy-Item -Destination {Join-Path $dbDestination $_.FullName.Substring($length)}
Write-Host "Zip application to cms.zip"
[io.compression.zipfile]::CreateFromDirectory("$releaseFolder/Application", "$releaseFolder/cms-v$version.zip")
Write-Host "Build docker image and push to docker hub?"
Pause
Write-Host "Build docker image..."
Invoke-Expression("docker build -t zkeasoft/zkeacms:latest .")
Invoke-Expression("docker tag zkeasoft/zkeacms:latest zkeasoft/zkeacms:v$version")
Write-Host "Push to docker hub..."
Invoke-Expression("docker push zkeasoft/zkeacms:latest")
Invoke-Expression("docker push zkeasoft/zkeacms:v$version")