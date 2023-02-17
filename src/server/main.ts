import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';
import { NextServer } from 'next/dist/server/next';
import { AppModule } from './app.module';
import Next from 'next';
import AppConfig from './app.config';
import { ConfigType } from '@nestjs/config/dist';
import { Logger } from '@nestjs/common/services';
import { ViewModule } from './modules/view/view.module';
import { ViewService } from './modules/view/view.service';
import { join, } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const {
    isDevelopment,
    viewsDir,
    port,
    env,
    staticFilesPath,
    isBuild,
  } = app.get<ConfigType<typeof AppConfig>>(AppConfig.KEY);

  app.useStaticAssets({
    root: join(process.cwd(), 'static'),
    prefix: staticFilesPath
  });

  let nextServer: NextServer;

  if (!isBuild) {
    nextServer = (
      module.hot?.data?.nextServer ||
      Next({ dev: isDevelopment, dir: viewsDir })
    );

    await app
      .select(ViewModule)
      .get(ViewService, { strict: true })
      .setNextServer(
        nextServer,
        !module.hot?.data?.nextServer
      );
  }

  await app.listen(port, '::');
  
  if (isBuild) {
    try {
      await promisify(exec)('yarn build:client');
      await app.close();
      process.exit(0);
    } catch (er) {
      process.exit(1);
    }
  }

  if (module.hot && !isBuild) {
    module.hot.accept();
    module.hot.dispose((data: any) => {
      data.nextServer = nextServer;
      app.close();
    });
  }

  Logger.log(
    `App running on ${env.toUpperCase()} mode @ PORT ${port}`,
    'Bootstrap'
  );
}

bootstrap().catch(er => {
  Logger.error(er, 'Bootstrap');
});
