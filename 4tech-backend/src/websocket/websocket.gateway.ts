import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class WebsocketGateway {

  @WebSocketServer() server;

  notifOnLike(userAcitivyId: string, userId: string) {
    this.server.emit('events', { mmediaId: userAcitivyId, userId });
  }
}