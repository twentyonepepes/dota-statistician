import { getCollection } from 'database';
import { writeFileSync } from 'fs';
import { create } from 'lodash';

async function createGuides(){

	const recordsCollection = await getCollection(`beta-maiden`,`records`);
    const records = await recordsCollection.find().limit(1000).toArray();

	const inflictorsMap = {};
	const abilitiesIndex = {};
	const itemsIndex = {};

	for (const record of records) {
        const { killed_by, damage_inflictor, damage_inflictor_received, first_purchase_time, ability_uses } = record;

        for (const source in damage_inflictor ) {
            // guideMap[`inflictor_${source}`] = record => record.damage_inflictor[source] || null
			inflictorsMap[source] = true;
        }

		for (const item in first_purchase_time) {
			itemsIndex[item] = true;
		}

		for (const ability in ability_uses) {
			abilitiesIndex[ability] = true;
		}

        // for (const source in damage_inflictor_received ) {
        //     guideMap[`inflictor_received_${source}`] = record => record.damage_inflictor_received[source] || null
        // }

        // for (const k in first_purchase_time) {
        //     guideMap[`first_purchase_k_${k}`] = record => record.first_purchase_time[k] || null
        // }
    }


	const inflictors = Object.keys(inflictorsMap).sort();
	const items = Object.keys(itemsIndex).sort();
	const abilities = Object.keys(abilitiesIndex).sort();

	writeFileSync('output/inflictors.json',JSON.stringify(inflictors, null, 2));
	writeFileSync('output/items.json',JSON.stringify(items, null, 2));
	writeFileSync('output/abilities.json',JSON.stringify(abilities, null, 2));
}

createGuides();