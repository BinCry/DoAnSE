function readServerEnv(names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();

    if (value) {
      return value;
    }
  }

  return "";
}

export function getGeminiApiKey() {
  return readServerEnv(["GEMINI_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"]);
}

export function getGeminiModel() {
  return readServerEnv(["GEMINI_MODEL"]) || "gemini-2.5-flash";
}

export function getNewsDataApiKey() {
  return readServerEnv(["NEWSDATA_API_KEY", "NEWSDATAIO_API_KEY"]);
}
