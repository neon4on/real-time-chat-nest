import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('room/:roomId')
  async getMessagesByRoom(@Param('roomId') roomId: number) {
    return this.messagesService.findMessagesByRoom(roomId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMessage(@Body() body: { username: string; roomId: number; message: string }) {
    const { username, roomId, message } = body;
    return this.messagesService.createMessage(username, roomId, message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteMessage(@Param('id') id: number) {
    return this.messagesService.deleteMessage(id);
  }
}
