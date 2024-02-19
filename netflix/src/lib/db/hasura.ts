export async function isNewUser(token: string, didToken: string) {
  const operationsDoc = `
  query MyQuery {
    users(where: {issuer: {_eq: "${didToken}"}}) {
      email
      id
      issuer
      publicAddress
    }
  }
`;
  const response = await queryHasuraGQL(operationsDoc, "MyQuery", {}, token);
  console.log({ response });
  return response?.data?.users?.length === 0;
}

async function queryHasuraGQL(operationsDoc: string, operationName: string, variables: Record<string, any>, token: string) {
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

function fetchMyQuery() {
  const operationsDoc = `
  query MyQuery {
    users(where: {issuer: {_eq: "${"didToken"}"}}) {
      email
      id
      issuer
      publicAddress
    }
  }
`;
  return queryHasuraGQL(operationsDoc, "MyQuery", {}, "jwtToken");
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error("errors: ", errors);
  }

  // do something great with this precious data
  console.log("data: ", data);
}

startFetchMyQuery().then();
