
const { createClient } = require('@supabase/supabase-js');

async function test() {
    console.log('Starting connection test...');
    try {
        const url = 'https://fypwevjepjivunfghdih.supabase.co';
        const key = 'sb_publishable_3uFkzlsdP2gTsTC9DVIezA_nBCMGMn9';

        if (!url || !key) {
            console.log('Missing URL or Key');
            return;
        }

        const supabase = createClient(url, key);
        console.log('Client created, fetching session...');

        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.log('Supabase Error:', error.message);
        } else {
            console.log('Supabase Success! Connection verified.');
        }
    } catch (e) {
        console.log('Script Error:', e.message);
        console.log(e.stack);
    }
}

test();
