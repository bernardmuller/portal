export class AuthenticationError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || 'Authentication required';
  }
}

export class AuthorizationError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || 'Authorization required';
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || 'Not Found.';
  }
}

export class NotAllowedError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || 'Not Allowed';
  }
}

export class UserError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || 'Not Allowed';
  }
}
