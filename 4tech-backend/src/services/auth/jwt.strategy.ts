import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

// secretKey Nunca deve ser exposta publicamente
// a chave secreta está aparecendo para ficar claro o que o cõdigo está fazendo em produção
// a chave deve ser protegida por medidas apropriadas (Ex: secret vaults, variáveis de ambiente ou serviços de configuração)
export const secretKey = '123'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiratio: false,
            secretOrKey: secretKey,
        });
    }

    async validate(payload: any) {
        return { userLogin: payload.userLogin };
    }

}