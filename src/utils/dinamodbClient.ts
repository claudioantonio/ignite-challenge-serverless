import { DynamoDB } from "aws-sdk";

const options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "x",
    secretAccessKey: "x"
};

const isOffline = () => {
    // IS_OFFLINE var is defined by serverless-offline plugin as true,
    // when it is in use.
    // When running on AWS, IS_OFFLINE will be false.
    return process.env.IS_OFFLINE;
}

export const document = isOffline()
    ? new DynamoDB.DocumentClient(options)
    : new DynamoDB.DocumentClient();