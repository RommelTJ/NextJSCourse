/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc: string, operationName: string, variables: Record<string, any>) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_HASURA_ADMIN_URL}`, {
    method: "POST",
    headers: {
      "X-Hasura-Role": "user",
      "X-Hasura-User-Id": "notrommel",
      // Authorization: "Bearer <token>",
      "X-Hasura-Admin-Secret": `${process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET}`,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

function fetchMyQuery() {
  const operationsDoc = `
  query MyQuery {
    users {
      email
      id
      issuer
      publicAddress
    }
  }
`;
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log("data: ", data);
}

startFetchMyQuery().then();
