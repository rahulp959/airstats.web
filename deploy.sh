cd $TRAVIS_BUILD_DIR

zip -r build.zip *
curl --ftp-create-dirs -T build.zip -u $FTPUSER:$FTPPASS ftp://vattrack.org/build.zip
