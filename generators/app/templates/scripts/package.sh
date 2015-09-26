#!/usr/bin/env bash

prog=$(basename $0)
if [ "$SNAP_PIPELINE_COUNTER" == "" ] || [ "$ARTIFACT_S3_BUCKET" == "" ] || [ "$ARTIFACT_S3_KEY" == "" ]; then
  echo "usage: SNAP_PIPELINE_COUNTER=XXX ARTIFACT_S3_BUCKET=YYY ARTIFACT_S3_KEY=ZZZ $prog"; exit 1
fi

if [ $? -ne 0 ]; then
  exit 1
else
  #write aws credentials to json file
  echo "{\"key\":\"$AWS_ACCESS_KEY_ID\",\"secret\":\"$AWS_SECRET_ACCESS_KEY\"}" > ./aws.json

  echo "tar -czf /tmp/$SNAP_PIPELINE_COUNTER.tar.gz --exclude \".git\" --exclude \".gitignore\" --exclude \"*.log\" ."
  tar -czf /tmp/$SNAP_PIPELINE_COUNTER.tar.gz --exclude ".git" --exclude ".gitignore" --exclude "*.log" .

  echo "aws s3api put-object --bucket $ARTIFACT_S3_BUCKET --key $ARTIFACT_S3_KEY/$SNAP_PIPELINE_COUNTER.tar.gz --body /tmp/$SNAP_PIPELINE_COUNTER.tar.gz"
  aws s3api put-object --bucket $ARTIFACT_S3_BUCKET --key $ARTIFACT_S3_KEY/$SNAP_PIPELINE_COUNTER.tar.gz --body /tmp/$SNAP_PIPELINE_COUNTER.tar.gz --debug
fi
