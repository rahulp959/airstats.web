cwd
pwd
zip -r build.zip build/*
curl --ftp-create-dirs -T build.zip -u $FTPUSER:$FTPPASS ftp://vattrack.org/build.zip
