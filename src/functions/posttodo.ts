import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { document } from "../utils/dinamodbClient";

interface ITodo {
    id: string; // id gerado para garantir um único todo com o mesmo id
    user_id: string; // id do usuário recebido no pathParameters
    title: string;
    done: boolean; // inicie sempre como false
    deadline: Date;
};

export const handler: APIGatewayProxyHandler = async (event) => {
    // user id comes from pathParameters
    // title and deadline come from body 
    const { title, deadline } = JSON.parse(event.body) as ITodo;

    const id = uuidv4();
    const user_id = event.pathParameters.user_id;

    await document.put({
        TableName: "todo",
        Item: {
            id, // id gerado para garantir um único todo com o mesmo id
            user_id, // id do usuário recebido no pathParameters
            title,
            done: false, // inicie sempre como false
            deadline: new Date(deadline).getTime(),
        }
    }).promise();

    const response = await document.query({
        TableName: "todo",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id,
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(response.Items[0]),
    }
}