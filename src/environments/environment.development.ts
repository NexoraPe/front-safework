export const environment = {
  production: false,

  // LOCAL-HOST BACKEND API, MUST HAVE THE OTHER BACKEND API RUNNING
  baseApiBaseUrl: 'http://localhost:8080/api/v1',

  // ENDPOINTS
  authenticationEndpoint: 'http://localhost:8080/api/v1/authentication',




  usersEndpoint: 'http://localhost:8080/api/v1/users',



  incidentsEndpoint: 'http://localhost:8080/api/v1/incidents',
  assignmentsEndpoint: 'http://localhost:8080/api/v1/assignments',
  notificationsEndpoint: 'http://localhost:8080/api/v1/notifications',
  analyticsEndpoint: 'http://localhost:8080/api/v1/analytics',

  userEndpointPath: '/users',
  incidentEndpointPath: '/incidents',
  assignmentEndpointPath: '/assignments',
  notificationEndpointPath: '/notifications',
  analyticsEndpointPath: '/analytics'
};
