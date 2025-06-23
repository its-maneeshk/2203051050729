const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";
const BEARER_TOKEN = ""; 

export const log = async (stack, level, pkg, message) => {
  const payload = {
    stack: stack.toLowerCase(),     
    level: level.toLowerCase(),     
    package: pkg.toLowerCase(),     
    message,
  };

  try {
    const res = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    
    return data;
  } catch (err) {

  }
};
