import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppConfig from './app.config';
import { AppService } from './app.service';
import { HomeModule } from './modules/home/home.module';
import { ViewModule } from './modules/view/view.module';
import { validateEnv } from './utils/validation.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
      load: [AppConfig],
      isGlobal: true,
      cache: true,
    }),
    ViewModule,
    HomeModule,
  ],
  providers: [AppService],
})
export class AppModule {}
