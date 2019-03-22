import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { AUTH_SERVICE, AuthModule, AuthService, AuthTokenService, defaults, User } from '../../src';
import { generateToken } from '../utils/jwt';

export function jwtOptionsFactory(authTokenService: AuthTokenService) {
  return {
      tokenGetter: () => {
          return authTokenService.getToken();
      }
  };
}

describe('Service: AuthService login scenarios:', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({
          jwtOptionsProvider: {
            provide: JWT_OPTIONS,
            useFactory: jwtOptionsFactory,
            deps: [AuthTokenService]
          }
        }),
        AuthModule.forRoot({ userType: User, tokenName: 'custom_token_name' })
      ],
      providers: []
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    const tokenService: AuthTokenService = TestBed.get(AuthTokenService);
    tokenService.remove();
  });

  it('should login', () => {
    const service: AuthService<User> = TestBed.get(AUTH_SERVICE);
    const tokenService: AuthTokenService = TestBed.get(AuthTokenService);
    expect(service).toBeTruthy();
    const token = generateToken();
    service.login('login', 'pass').subscribe(() => {
        expect(tokenService.getToken()).toEqual(token.access_token);
        expect(service.isAuthenticated()).toBeTruthy();
    });
   
    httpMock.expectOne(defaults.tokenEndpoint)
      .flush({
        'custom_token_name': token.access_token
      });    
  });


  it('should not login when token was not specified at response (or wrong token name specified)', () => {
    const service: AuthService<User> = TestBed.get(AUTH_SERVICE);
    const tokenService: AuthTokenService = TestBed.get(AuthTokenService);
    expect(service).toBeTruthy();
    service.login('login', 'pass').subscribe(() => {
        expect(JSON.parse(tokenService.getToken())).toBeFalsy();
        expect(service.isAuthenticated()).toBeFalsy();
    });
    httpMock.expectOne(defaults.tokenEndpoint)
      .flush({});    
  });

  
});
