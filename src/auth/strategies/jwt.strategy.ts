import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { MicroserviceClientManager } from '../../common/microservice/microservice-client.manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private microserviceClient: MicroserviceClientManager,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    let roles = payload.roles;
    
    // If roles are not in the payload, fetch from microservice
    if (!roles) {
      try {
        const user = await this.microserviceClient.sendUserCommand('user.findById', payload.sub);
        roles = user && typeof user === 'object' && 'roles' in user ? user.roles : [];
      } catch (error) {
        console.error('Error fetching user roles:', error.message);
        roles = [];
      }
    }
    return { userId: payload.sub, email: payload.email, roles };
  }
}