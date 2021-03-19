#!/bin/sh

echo "Deploy Storybook CDN"

BUCKET=s3://webcomponents-tecnologia-senior-com-br

aws s3 sync storybook-static ${BUCKET}/master --delete

echo "Copy to S3 done!"
echo "Preparing to invalidade cache on AWS CloudFront"

aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_LANDINGPAGE_DIST_ID} --paths "master/*"

# Create a isolated folder to version
if [ ! -f $VERSION ]; then
  aws s3 sync storybook-static ${BUCKET}/${VERSION} --delete
  aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_LANDINGPAGE_DIST_ID} --paths "#{$VERSION}/*"
fi
