import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, NotContains } from "class-validator";

export class RegisterUserDto {

    @ApiProperty({
        description: "Nome",
        nullable: false,
        required: true,
        type: "string",
        example: "Pedro Machado",
    })
    @IsString()
    @MinLength(3)
    name: string;

    
    @ApiProperty({
        description: "Email",
        uniqueItems: true,
        nullable: false,
        required: true,
        type: "string",
        example: "pedromachado2298@gmail.com",
    })
    @IsEmail()
    email: string;
    
    
    @ApiProperty({
        description: "Password: Minimo 6 caracteres, 1 maiusculo, 1 minusculo and 1 numero",
        nullable: false,
        required: true,
        type: "string",
        example: "Password123",
    })
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'A senha precisa contem pelo menos um caractere minusculo, um maiusculo e um numero.',
    })
    @NotContains(' ', { message: 'A senha não deve conter espaços' }) 
    password: string;
    
    @ApiProperty({
        description: "Confirme a senha, a senha precisa ser legal",
        nullable: false,
        required: true,
        type: "string",
        example: "Password123",
    })
    @IsString()
    passwordconf: string;
    

    @ApiProperty({
        description: "User Avatar Image",
        nullable: true,
        required: false,
        type: "string",
        example: "https://picsum.photos/200/300",
    })
    @IsString()
    @IsOptional()
    image: string;
    

}
