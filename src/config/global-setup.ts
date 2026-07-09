import { logger } from "@helper/logger/Logger";

export default async function globalSetup(): Promise<void> {
  logger.info("═══════════════════════════════════════════════════════════");
  logger.info("Global Setup - UI framework run started");
  logger.info("═══════════════════════════════════════════════════════════");
}
