import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ViewController } from "./view.controller";
import { ViewFilter } from "./view.filter";
import { ViewService } from "./view.service";

@Module({
  providers: [
    ViewService,
    {
      provide: APP_FILTER,
      useClass: ViewFilter,
    }
  ],
  controllers: [ViewController]
})
export class ViewModule {}