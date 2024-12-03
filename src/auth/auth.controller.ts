import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginResponse } from './interfaces';
import { Auth, GetUser } from './decorators';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgetUserDto } from './dto/forget-user.dto';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({
    summary: 'CADASTRO',
    description: 'Endpoint público para registrar um novo usuário com o papel "user".'
  })
  @ApiResponse({ status: 201, description: 'Sucesso', type: LoginResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro no servidor' }) //Swagger
  register(@Body() createUserDto: RegisterUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'LOGIN',
    description: 'Endpoint público para realizar login e obter o Token de Acesso.'
  })
  @ApiResponse({ status: 200, description: 'Sucesso', type: LoginResponse })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro no servidor' }) //Swagger
  async login(@Res() response, @Body() loginUserDto: LoginUserDto) {
    const data = await this.authService.loginUser(loginUserDto.email, loginUserDto.password);
    response.status(HttpStatus.OK).send(data);
  }

  @Get('refresh-token')
  @ApiOperation({
    summary: 'Atualizar Token',
    description: 'Endpoint privado, permitido para usuários autenticados, para renovar o Token de Acesso antes de expirar.'
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Sucesso', type: LoginResponse })
  @ApiResponse({ status: 401, description: 'Não autorizado' }) //Swagger
  @Auth()
  refreshToken(
    @GetUser() user: User
  ) {
    return this.authService.refreshToken(user);
  }

  @Post('forget-password')
  @ApiOperation({
    summary: 'Esqueci a senha',
    description: 'Endpoint que recebe um email e envia uma chave unica ao usuario.'
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Email enviado'})
  @ApiResponse({ status: 401, description: 'Não autorizado' }) //Swagger
  async forgetpassword(@Res() response, @Body() forgetUserDto: ForgetUserDto) {

    const data = await this.authService.forgotPassword(forgetUserDto.email);
    response.status(HttpStatus.OK).send(data);

  }

}
