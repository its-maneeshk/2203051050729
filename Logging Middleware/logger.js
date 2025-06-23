const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjAzMDUxMDUwNzI5QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc1MDY2NTQwMywiaWF0IjoxNzUwNjY0NTAzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiODE3ZmY5NGMtMjcyMS00MGY5LThmNDQtNjNkYTUwZjNmMzM4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWFuaXNoIGt1bWFyIHBhdGVsIiwic3ViIjoiYjRhZmIxN2MtMGU1YS00NzAzLTg5ODAtMmZhNjkyMTVmZDlhIn0sImVtYWlsIjoiMjIwMzA1MTA1MDcyOUBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4iLCJuYW1lIjoibWFuaXNoIGt1bWFyIHBhdGVsIiwicm9sbE5vIjoiMjIwMzA1MTA1MDcyOSIsImFjY2Vzc0NvZGUiOiJUUnpnV00iLCJjbGllbnRJRCI6ImI0YWZiMTdjLTBlNWEtNDcwMy04OTgwLTJmYTY5MjE1ZmQ5YSIsImNsaWVudFNlY3JldCI6IkFHekVSTUhDUUNTdUZVTXMifQ.U_bJRAnAxG7Asi2xciozHzNqJbRTEYO67QismZ3Uxyo";

export const log = async (stack, level, pkg, message) => {
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message,
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Log server error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(err);
  }
};
