import { Controller, Get, Request, Response } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { parse } from "url";
import { ViewService } from "./view.service";

@Controller()
export class ViewController {
  constructor(
    private readonly viewService: ViewService,
  ) {}

  @Get('*')
  renderClient(
    @Request()
    req: FastifyRequest,
    @Response()
    res: FastifyReply,
  ) {
    const parsedUrl = parse(req.url, true);
    this.viewService.nextServer.render(
      req.raw, 
      res.raw, 
      parsedUrl.pathname, 
      parsedUrl.query, 
      parsedUrl
    );
  }
}