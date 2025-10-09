export const environment = {
  production: true,
  //Up to change it for the real backend URL later or a deployed db.json server
  baseApiBaseUrl: 'https://safeworkapi.azurewebsites.net',
  usersEndpoint: 'https://safeworkapi.azurewebsites.net/users',
  incidentsEndpoint: 'https://safeworkapi.azurewebsites.net/incidents',
  assignmentsEndpoint: 'https://safeworkapi.azurewebsites.net/assignments',
  notificationsEndpoint: 'https://safeworkapi.azurewebsites.net/notifications',
  analyticsEndpoint: 'https://safeworkapi.azurewebsites.net/analytics',

  userEndpointPath: '/users',
  incidentEndpointPath: '/incidents',
  assignmentEndpointPath: '/assignments',
  notificationEndpointPath: '/notifications',
  analyticsEndpointPath: '/analytics'
};
