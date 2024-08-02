import { logger } from "./setup/logging";
import { web } from "./setup/web";

web.listen(3000, () => {
    logger.info("Server is running on http://localhost:3000 || http://127.0.0.1:3000 🚀");
})