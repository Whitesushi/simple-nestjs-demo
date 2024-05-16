import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':id')
  getUser(@Param('id') id: string) {
    if (id === 'error') {
      throw new Error('Specified error test scenario');
    }
    return `User ${id}`;
  }

  @Post()
  createUser(@Body() body) {
    if (!body.name) {
      throw new Error('Name is required');
    }
    return body;
  }
}
