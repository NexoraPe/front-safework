export const environment = {
  production: true,
  //Up to change it for the real backend URL later or a deployed db.json server
  baseApiBaseUrl: 'https://backend-safework.azurewebsites.net/api/v1',

  // ENDPOINTS
  authenticationEndpoint: 'https://backend-safework.azurewebsites.net/api/v1/authentication',




  usersEndpoint: 'https://backend-safework.azurewebsites.net/api/v1/users',



  incidentsEndpoint: 'https://backend-safework.azurewebsites.net/api/v1/incidents',
  assignmentsEndpoint: 'https://backend-safework.azurewebsites.net/api/v1/assignments',
  notificationsEndpoint: 'https://backend-safework.azurewebsites.net/api/v1/notifications',
  analyticsEndpoint: 'https://backend-safework.azurewebsites.net/api/v1/analytics',

  userEndpointPath: '/users',
  incidentEndpointPath: '/incidents',
  assignmentEndpointPath: '/assignments',
  notificationEndpointPath: '/notifications',
  analyticsEndpointPath: '/analytics'
};
