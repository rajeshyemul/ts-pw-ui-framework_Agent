import { logger } from "@helper/logger/Logger";

export default async function globalTeardown(): Promise<void> {
  logger.info("═══════════════════════════════════════════════════════════");
  logger.info("Global Teardown - UI framework run complete");
  logger.info("═══════════════════════════════════════════════════════════");
}
