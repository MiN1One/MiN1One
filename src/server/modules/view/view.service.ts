import { Injectable, Logger } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { NextServer } from "next/dist/server/next";
import { parse } from "url";

@Injectable()
export class ViewService {
  nextServer: NextServer;

  async setNextServer(server: NextServer, prepare: boolean) {
    this.nextServer = server;
    
    if (prepare) {
      try {
        await this.nextServer.prepare();
      } catch (er) {
        Logger.error(er, 'ViewService:setNextServer');
      }
    }
  }

  handler(req: FastifyRequest, res: FastifyReply) {
    const parsedUrl = parse(req.url, true);
    this.nextServer.getRequestHandler()(req.raw, res.raw, parsedUrl);
  }
}