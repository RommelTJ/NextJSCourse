async function fetchGraphQL(operationsDoc: string, operationName: string, variables: Record<string, any>, token: string) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_HASURA_ADMIN_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

function fetchMyQuery(token: string) {
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
  return fetchGraphQL(operationsDoc, "MyQuery", {}, token);
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery("token");

  if (errors) {
    // handle those errors like a pro
    console.error("errors: ", errors);
  }

  // do something great with this precious data
  // console.log("data: ", data);
}

startFetchMyQuery().then();
