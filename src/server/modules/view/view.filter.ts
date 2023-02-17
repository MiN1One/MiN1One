import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { ViewService } from './view.service';

@Catch(NotFoundException)
export class ViewFilter implements ExceptionFilter {
  constructor(
    private readonly viewService: ViewService
  ) {}

  catch(_exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getRequest(), res = context.getResponse();
    this.viewService.handler(req, res);
  }
}