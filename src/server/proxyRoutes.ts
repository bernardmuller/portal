import { Application } from 'express';
import services from '../../services.json';
import { TService } from '../interfaces';
import {
  authenticateUser,
  serviceMiddleware,
} from '../resources/auth/middleware';
import { checkEnvironmentIsProduction } from '../utils';
import { catchAsync } from './routes';
import httpProxy from 'express-http-proxy';

export function buildProxyUrl(service: TService) {
  const url = checkEnvironmentIsProduction()
    ? service.productionUrl
    : service.developmentUrl;
  return url;
}

const proxyMiddleware = () => {
  return [authenticateUser, serviceMiddleware].map((ware) => catchAsync(ware));
};

export function createProxyEndpoint(app: Application, service: TService) {
  app.use(
    service.queryParam.toString(),
    proxyMiddleware(),
    httpProxy(buildProxyUrl(service)),
  );
}

export function createProxyEndpoints(app: Application, services: TService[]) {
  services.forEach((service) => createProxyEndpoint(app, service));
}

export function configureProxyRoutes(app: Application) {
  services.forEach((service) => {
    createProxyEndpoint(app, service);
  });
}
