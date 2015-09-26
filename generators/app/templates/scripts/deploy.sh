#!/usr/bin/env bash

prog=$(basename $0)
if [ "$STACK_ID" == "" ] || [ "$APP_ID" == "" ] || [ "$SNAP_PIPELINE_COUNTER" == "" ] || [ "$ARTIFACT_S3_BUCKET" == "" ] || [ "$ARTIFACT_S3_KEY" == "" ]; then
  echo "usage: STACK_ID=AAA APP_ID=BBB SNAP_PIPELINE_COUNTER=XXX ARTIFACT_S3_BUCKET=YYY ARTIFACT_S3_KEY=ZZZ $prog"; exit 1
fi
echo "STACK_ID=$STACK_ID APP_ID=$APP_ID SNAP_PIPELINE_COUNTER=$SNAP_PIPELINE_COUNTER ARTIFACT_S3_BUCKET=$ARTIFACT_S3_BUCKET"

if [ "$MIGRATE" == "" ]; then
  MIGRATE="false"
fi
echo "MIGRATE=$MIGRATE"

echo "aws opsworks update-app --region us-east-1 --app-id $APP_ID --app-source Type=s3,Url=https://s3.amazonaws.com/$ARTIFACT_S3_BUCKET/$ARTIFACT_S3_KEY/$SNAP_PIPELINE_COUNTER.tar.gz,Username=$AWS_ACCESS_KEY_ID,Password=$AWS_SECRET_ACCESS_KEY"
aws opsworks update-app --region us-east-1 --app-id $APP_ID --app-source Type=s3,Url=https://s3.amazonaws.com/$ARTIFACT_S3_BUCKET/$ARTIFACT_S3_KEY/$SNAP_PIPELINE_COUNTER.tar.gz,Username=$AWS_ACCESS_KEY_ID,Password=$AWS_SECRET_ACCESS_KEY

echo "aws opsworks create-deployment --region us-east-1 --stack-id $STACK_ID --app-id $APP_ID --command \"{\\\"Name\\\":\\\"deploy\\\", \\\"Args\\\":{\\\"migrate\\\":[\\\"$MIGRATE\\\"]}}\""
aws opsworks create-deployment --region us-east-1 --stack-id $STACK_ID --app-id $APP_ID --command "{\"Name\":\"deploy\", \"Args\":{\"migrate\":[\"$MIGRATE\"]}}"
