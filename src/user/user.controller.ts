import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth, GetUser } from 'src/auth/decorators';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'CREATE USER',
    description: 'Endpoint privado para criar um novo usuário. É permitido apenas para usuários "admin" e permite a criação de usuários com a função "admin".'
  })
  @ApiResponse({status: 201, description: 'Created', type: User})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 500, description: 'Server error'})             //Swagger
  @Auth(Role.admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Get()
  @ApiOperation({
    summary: 'GET ALL USERS',
    description: 'Endpoint privado para listar todos os usuários. É permitido apenas para usuários "admin".'
  })
  @ApiResponse({status: 200, description: 'Ok', type: User, isArray: true})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden' })
  @ApiResponse({status: 500, description: 'Server error'})             //Swagger
  @Auth(Role.admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'GET USER BY ID',
    description: 'Endpoint privado para obter dados de um usuário por um ID específico. <ul><li>A função "user" tem permissão para acessar apenas suas próprias informações.</li><li>A função "admin" tem o privilégio de acessar as informações de qualquer usuário.</li></ul>'
  })
  @ApiResponse({status: 200, description: 'Ok', type: User})
  @ApiResponse({status: 401, description: 'Unauthorized'})             
  @ApiResponse({status: 500, description: 'Server error'})             //Swagger
  @Auth(Role.admin, Role.user)
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.userService.findOne("id", id, user);
  }

  @Get('email/:email')
  @ApiOperation({
    summary: 'GET USER BY EMAIL',
    description: 'Endpoint privado para obter dados de um usuário por e-mail. <ul><li>A função "user" tem permissão para acessar apenas suas próprias informações.</li><li>A função "admin" tem o privilégio de acessar as informações de qualquer usuário.</li></ul>'
  })
  @ApiResponse({status: 200, description: 'Ok', type: User})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 500, description: 'Server error'})             //Swagger
  @Auth(Role.admin, Role.user)
  findOneByEmail(@Param('email') email: string, @GetUser() user: User) {
    return this.userService.findOne("email", email, user);
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'UPDATE USER BY ID',
    description: 'Endpoint privado para atualizar dados de um usuário por ID. <ul><li>A função "user" tem permissão para atualizar apenas suas próprias informações.</li><li>A função "admin" tem o privilégio de atualizar as informações de qualquer usuário.</li><li>Somente a função "admin" pode atualizar o campo "role".</li></ul>'
  })
  @ApiResponse({status: 200, description: 'Ok', type: User})
  @ApiResponse({status: 400, description: 'Bad request'})             
  @ApiResponse({status: 401, description: 'Unauthorized'})             
  @ApiResponse({status: 500, description: 'Server error'})             //Swagger
  @Auth(Role.admin, Role.user)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.userService.update("id", id, updateUserDto, user);
  }
  
  @Patch('email/:email')
  @ApiOperation({
    summary: 'UPDATE USER BY EMAIL',
    description: 'Endpoint privado para atualizar dados de um usuário por e-mail. <ul><li>A função "user" tem permissão para atualizar apenas suas próprias informações.</li><li>A função "admin" tem o privilégio de atualizar as informações de qualquer usuário.</li><li>Somente a função "admin" pode atualizar o campo "role".</li></ul>'
  })
  @ApiResponse({status: 200, description: 'Ok', type: User})
  @ApiResponse({status: 400, description: 'Bad request'})             
  @ApiResponse({status: 401, description: 'Unauthorized'})             
  @ApiResponse({status: 500, description: 'Server error'})             //Swagger
  @Auth(Role.admin, Role.user)
  updateByEmail(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.userService.update("email", email, updateUserDto, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'DELETE USER BY ID',
    description: 'Endpoint privado para deletar usuário por Id. <ul><li>O papel "user" tem permissão para remover apenas suas próprias informações.</li><li>O papel "admin" tem o privilégio de deletar qualquer usuário.</li></ul>'
  })
  @ApiOkResponse({content: {"application/json": {example: {"message": "User deleted"}}}})
  @ApiResponse({status: 400, description: 'Bad request'})             
  @ApiResponse({status: 401, description: 'Unauthorized'})             
  @ApiResponse({status: 500, description: 'Server error'})             //Swagger
  @Auth(Role.admin, Role.user)
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.userService.remove("id", id, user);
  }
  
  @Delete('email/:email')
  @ApiOperation({
    summary: 'DELETE USER BY EMAIL',
    description: 'Endpoint privado para deletar usuário por Email. <ul><li>O papel "user" tem permissão para remover apenas suas próprias informações.</li><li>O papel "admin" tem o privilégio de deletar qualquer usuário.</li></ul>'
  })
  @ApiOkResponse({content: {"application/json": {example: {"message": "User deleted"}}}})
  @ApiResponse({status: 400, description: 'Bad request'})             
  @ApiResponse({status: 401, description: 'Unauthorized'})             
  @ApiResponse({status: 500, description: 'Server error'})             //Swagger
  @Auth(Role.admin, Role.user)
  removeByEmail(@Param('email') email: string, @GetUser() user: User) {
    return this.userService.remove("email", email, user);
  }

}
