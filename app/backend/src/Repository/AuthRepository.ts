import { RedisClientType } from "@redis/client";

interface IauthRepository{
    blacklistToken(token:string,expiresInSeconds:number):Promise<void>,
    isTokenBlackListed(token:string):Promise<boolean>,
}
class AuthRepository implements IauthRepository{
    constructor(protected redis:RedisClientType){}

    public async blacklistToken(token:string,expiresInSeconds:number):Promise<void>{
        await this.redis.set(token,'revoked',{EX:expiresInSeconds});   
    }
    public async isTokenBlackListed(token:string):Promise<boolean>{
        const isRevoked = await this.redis.get(token)
        return isRevoked === "revoked"
    }
}