import { Module } from "@nestjs/common";

import { HealthController } from "./health.controller.spec";

@Module({
  controllers: [HealthController],
})
export class HealthModule {}