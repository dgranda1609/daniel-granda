import 'dotenv/config';
import { syncBlogPosts, syncCuratedLinks } from '../src/services/syncService.js';

async function run() {
  console.log('Syncing blog posts...');
  const posts = await syncBlogPosts();
  console.log(`  Posts synced: ${posts.synced}`);
  if (posts.errors.length > 0) {
    console.log('  Errors:', posts.errors);
  }

  console.log('Syncing curated links...');
  const curated = await syncCuratedLinks();
  console.log(`  Links synced: ${curated.synced}`);
  if (curated.errors.length > 0) {
    console.log('  Errors:', curated.errors);
  }

  console.log('\nSync complete.');
  process.exit(0);
}

run().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
