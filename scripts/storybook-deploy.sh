#!/bin/sh

echo "Deploy Storybook CDN"

BUCKET=s3://tecnologia.senior.com.br-us-east-1

aws s3 sync storybook-static ${BUCKET}/webcomponents --delete

echo "Copy to S3 done!"
echo "Preparing to invalidade cache on AWS CloudFront"

aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_LANDINGPAGE_DIST_ID} --paths "/webcomponents/*"
