const MAX_AGE = 7 * 24 * 60 * 60;

export const setTokenCookie = (token: string) => {
  return {
    name: 'token',
    value: token,
    httpOnly: true,
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    path: '/',
  };
};
