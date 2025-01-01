import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRooms() {
    return this.roomsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getRoomById(@Param('id') id: number) {
    return this.roomsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRoom(@Body() body: { name: string; description: string }) {
    const { name, description } = body;
    return this.roomsService.createRoom(name, description);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteRoom(@Param('id') id: number) {
    return this.roomsService.deleteRoom(id);
  }
}
