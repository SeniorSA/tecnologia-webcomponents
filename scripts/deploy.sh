#!/bin/sh

echo "Deploy to CDN"

BUCKET=s3://cdn.tecnologia.senior.com.br/platform/tecnologia-webcomponents/

aws s3 sync ${BASE_PATH}dist ${BUCKET}${GITHUB_REF##*/} --delete
aws s3 sync loader ${BUCKET}${GITHUB_REF##*/}/loader/ --delete

echo "Copy to S3 concluded"
echo "Prepare to invalidade cache on CloudFront"

aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_DIST_ID} --paths "/platform/tecnologia-webcomponents/${GITHUB_REF##*/}/*"

# upload only when version changed
if [ ! -f $VERSION ] && [ ! -f $OLD_VERSION ]; then
  if [ $VERSION != $OLD_VERSION ]; then
    echo "Uploading to $VERSION folder!"

    aws s3 sync ${BASE_PATH}dist ${BUCKET}${VERSION}
    aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_DIST_ID} --paths "/platform/tecnologia-webcomponents/${VERSION}/*"
  fi
fi
