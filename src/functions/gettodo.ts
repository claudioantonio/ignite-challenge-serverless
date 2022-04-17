import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dinamodbClient";

interface ITodo {
    id: string; // id gerado para garantir um único todo com o mesmo id
    user_id: string; // id do usuário recebido no pathParameters
    title: string;
    done: boolean; // inicie sempre como false
    deadline: Date;
};

export const handler: APIGatewayProxyHandler = async (event) => {
    const user_id = event.pathParameters.user_id;

    const response = await document.scan({
        TableName: "todo",
        FilterExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": user_id,
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(response.Items as ITodo[]),
    }
}