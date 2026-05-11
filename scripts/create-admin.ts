import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local" });
import { createSupabaseAdminClient } from "../src/lib/supabase/admin";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q: string): Promise<string> {
  return new Promise((resolve) => rl.question(q, (a) => resolve(a)));
}

async function main() {
  console.log("\n👤 Create an admin user for the SAARZ admin panel\n");
  const email = await ask("Email: ");
  const password = await ask("Password (min 8 chars): ");

  if (!email || password.length < 8) {
    console.error("❌ Invalid input");
    process.exit(1);
  }

  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "admin" },
  });

  if (error) {
    console.error("❌ Failed:", error.message);
    process.exit(1);
  }

  console.log(`\n✅ Admin created: ${data.user?.email}`);
  console.log(`   Login at /admin/login\n`);
  rl.close();
  process.exit(0);
}

main();
