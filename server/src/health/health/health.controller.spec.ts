import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {
  @Get("api/health")
 
    // eslint-disable-next-line nestjs-pedantic/match-methods-to-routes -- beacuse
    getSingleQuiz(){
    return true;
    }
}