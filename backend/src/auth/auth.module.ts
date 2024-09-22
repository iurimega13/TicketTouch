import { Module } from '@nestjs/common'; 
import { AuthController } from './auth.controller'; 
import { AuthService } from './auth.service'; 
import { UserModule } from '../users/user.module'; 
import { JwtModule } from '@nestjs/jwt'; 
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    UserModule, 
    JwtModule.registerAsync({ 
      useFactory: () => ({ 
        global: true, 
        secret: process.env.JWT_SECRET, 
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }, 
      }),
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService, JwtStrategy], 
})
export class AuthModule {}
