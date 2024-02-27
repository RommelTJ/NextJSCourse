import { MagicUserMetadata } from "@magic-sdk/admin";

export async function insertStats(token: string, { favorited, userId, watched, videoId }) {
  const operationsDoc = `
  mutation insertStats($favorited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_stats_one(object: {favorited: $favorited, userId: $userId, watched: $watched, videoId: $videoId}) {
      favorited
      id
      userId
    }
  }
`;

  return await queryHasuraGQL(
    operationsDoc,
    "insertStats",
    { favorited, userId, watched, videoId },
    token
  );
}

export async function updateStats(token: string, { favorited, userId, watched, videoId }) {
  const operationsDoc = `
mutation updateStats($favorited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
  update_stats(
    _set: {watched: $watched}, 
    where: {
      userId: {_eq: $userId}, 
      videoId: {_eq: $videoId}
    }) {
    returning {
      favorited,
      userId,
      watched,
      videoId
    }
  }
}
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "updateStats",
    { favorited, userId, watched, videoId },
    token
  );

  return response;
}

type HasuraVideoIdByUserResponse = {
  data: {
    stats: object[];
  }
}

export async function findVideoIdByUser(token: string, userId: string, videoId: string) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {
      id
      userId
      videoId
      favorited
      watched
    }
  }
`;

  const response: HasuraVideoIdByUserResponse = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUserId",
    {
      videoId,
      userId,
    },
    token
  );
  return response.data.stats.length === 0;
}

export async function createNewUser(token: string, metadata: MagicUserMetadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    {
      issuer,
      email,
      publicAddress,
    },
    token
  );
  console.log({ response, issuer });
  return response;
}

export async function isNewUser(token: string, issuer: string) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    {
      issuer,
    },
    token
  );
  console.log({ response, issuer });
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
