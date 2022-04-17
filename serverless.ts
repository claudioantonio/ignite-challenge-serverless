import type { AWS } from '@serverless/typescript';


const serverlessConfiguration: AWS = {
  service: 'ignite-serverless-todo',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dynamodb-local', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: ["*"]
      }
    ]
  },
  // import the function via paths
  functions: {
    posttodo: {
      handler: "src/functions/posttodo.handler",
      events: [{
        http: {
          path: "posttodo/{user_id}",
          method: "post",
          cors: true,
        }
      }]
    },
    gettodo: {
      handler: "src/functions/gettodo.handler",
      events: [{
        http: {
          path: "getttodo/{user_id}",
          method: "get",
          cors: true,
        }
      }]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      stages: ['dev', 'local'],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      }
    },
  },
  resources: {
    Resources: {
      dbTodo: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "todo",
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
          AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S",
          }, {
            AttributeName: "user_id",
            AttributeType: "S",
          }],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
            {
              AttributeName: "user_id",
              KeyType: "RANGE",
            }]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
