import { Controller, Get } from "@nestjs/common";
import { HomeService } from "./home.service";

@Controller('api/home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
  ) {}

  @Get()
  getHomeData() {
    return this.homeService.getHomeData();
  }
}