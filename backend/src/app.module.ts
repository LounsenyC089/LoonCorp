import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './modules/services/services.module';
import { EquipmentsModule } from './modules/equipments/equipments.module';
import { InterventionsModule } from './modules/interventions/interventions.module';
import { AuditsModule } from './modules/audits/audits.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 120,
      },
    ]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ServicesModule,
    EquipmentsModule,
    InterventionsModule,
    AuditsModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
