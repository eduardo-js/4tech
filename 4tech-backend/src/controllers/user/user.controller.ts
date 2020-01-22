import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    retornarUsuarios(){
        return ['João', 'Danilo', 'X'];
    }

}
