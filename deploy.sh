echo $PWD;
zip -r build.zip $PWD/build/*
curl --ftp-create-dirs -T build.zip -u $FTPUSER:$FTPPASS ftp://vattrack.org/build.zip
