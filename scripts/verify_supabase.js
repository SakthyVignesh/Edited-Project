
const { createClient } = require('@supabase/supabase-js');

const url = 'https://fypwevjepjivunfghdih.supabase.co';
// The key provided by the user
const key = 'sb_publishable_3uFkzlsdP2gTsTC9DVIezA_nBCMGMn9';

console.log(`Testing connection to ${url}...`);

try {
    const supabase = createClient(url, key);

    // Try a simple auth check which doesn't require tables
    supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
            console.log('Connection Error:', error.message);
        } else {
            console.log('Connection Successful! Session retrieved.');
        }
    }).catch(err => {
        console.log('Promise Error:', err.message);
    });

} catch (e) {
    console.log('Initialization Error:', e.message);
}
