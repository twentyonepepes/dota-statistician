import { getCollection } from 'database';
import { fstat, writeFileSync } from 'fs';
import { seriesToStats } from './stats';


import { accessorMap } from './accessor';

export const recordsToStatMap = records => {


    const keyMap = accessorMap;

  

    const mergedKeyMap = {
        ... keyMap,
        // ... itemUsesKeyMap,
        // ... inflictorsMap
    }

    const statsMap = {};

    for (const [key, accessor] of Object.entries(mergedKeyMap)) {

        const b = records.map(accessor);
        const c = seriesToStats(b.filter(b2 => b2 !== null));
        statsMap[key] = c;
        
    }

    return statsMap;

}


async function getStatistics(){
    
    const recordsCollection = await getCollection(`beta-maiden`,`records`);
    const records = await recordsCollection.find().limit(20000).toArray();

    const statsMap = recordsToStatMap(records);

    writeFileSync('output/beta.json', JSON.stringify(statsMap, null, 2));

    console.log("Done");
       
      
};

getStatistics();