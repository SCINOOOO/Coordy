import "dotenv/config";

/* utils/preCheck.js */

async function preCheck() {
    const requiredEnvVars = ["TOKEN", "CLIENT_ID", "GUILD_ID", "ADMIN_ID", "TEMP_CREATOR_ID", "TEMP_CATEGORY_ID"];
    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
        console.error(`Missing required .env variables: ${missingEnvVars.join(", ")}`);
        process.exit(1);
    }
}

export default preCheck;