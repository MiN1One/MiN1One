import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
  isDevelopment: process.env.NODE_ENV === 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  viewsDir: process.env.VIEWS_DIR,
  env: process.env.NODE_ENV,
  staticFilesPath: process.env.STATIC_FILES_PREFIX_PATH,
  isBuild: (process.env.NODE_ENV as any) === 'build',
}));