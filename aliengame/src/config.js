import configJson from "./auth_config.json";

export function getConfig() {
  return {
    audience: configJson.audience,
    clientId: configJson.clientId,
    domain: configJson.domain,
    jwksUri: configJson.jwksUri,
    scope: configJson.scope,
    scopeForAccessToken: configJson.scopeForAccessToken,
  };
}