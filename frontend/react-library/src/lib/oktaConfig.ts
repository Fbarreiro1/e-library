export const oktaConfig = {
    clientId: 'K904c4A09huNw1swTdJosTdfjPa2r3gM',
    issuer: 'https://dev-qemf53ej45b61pui.okta.com/oauth2/default'
,
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    //disableHttpsCheck: true,
}