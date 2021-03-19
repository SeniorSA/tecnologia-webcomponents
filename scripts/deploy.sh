#!/bin/sh

echo "Deploy to CDN"

BUCKET=s3://cdn.tecnologia.senior.com.br/platform/tecnologia-webcomponents/
FOLDER_NAME=${GITHUB_REF##*/}

# If it's a pull request, change to GITHUB_HEAD_REF
if [ ! -f $VERSION ] && [ ! -f $OLD_VERSION ]; then
  FOLDER_NAME=$GITHUB_HEAD_REF
fi

aws s3 sync ${BASE_PATH}dist ${BUCKET}${FOLDER_NAME} --delete
aws s3 sync loader ${BUCKET}${FOLDER_NAME}/loader/ --delete

echo "Copy to S3 concluded"
echo "Prepare to invalidade cache on CloudFront"

aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_DIST_ID} --paths "/platform/tecnologia-webcomponents/${FOLDER_NAME}/*"

# upload only when version changed
if [ ! -f $VERSION ] && [ ! -f $OLD_VERSION ]; then
  if [ $VERSION != $OLD_VERSION ]; then
    echo "Uploading to $VERSION folder!"

    aws s3 sync ${BASE_PATH}dist ${BUCKET}${VERSION}
    aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_DIST_ID} --paths "/platform/tecnologia-webcomponents/${VERSION}/*"
  fi
fi
