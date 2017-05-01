zip -r build.zip $TRAVIS_BUILD_DIR/build/*
curl --ftp-create-dirs -T build.zip -u $FTPUSER:$FTPPASS ftp://vattrack.org/build.zip
