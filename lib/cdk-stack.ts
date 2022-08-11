import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { CfnOutput } from 'aws-cdk-lib';
import { ImagePullPrincipalType } from 'aws-cdk-lib/aws-codebuild';
import * as iam from "aws-cdk-lib/aws-iam";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new Function(this, "Hello-lambda", {
      // runtime: Runtime.NODEJS_14_X,
      runtime: Runtime.PYTHON_3_9,
      memorySize: 512,
      // handler: 'app.handler',
      handler: 'listBuckets.main',
      code: Code.fromAsset(join(__dirname,'../lambdas')),
      environment: {
        NAME: "nariman",
        AGE: "35",
        ENV: "PROD"
      }
    })

    const listBucketPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:*'],
      resources: ['*']
    });


    handler.role?.attachInlinePolicy(
      new iam.Policy(this, "list-resources", {
        statements: [listBucketPolicy]
      })
    )

    new CfnOutput(this, "handlerArn", {value: handler.functionArn});

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
