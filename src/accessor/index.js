const to_duration_min = record => record.duration / 60;

import items from '../../lib/items.json';
import inflictors from '../../lib/inflictors.json';
import abilities from '../../lib/abilities.json';

export const accessorMap =  {
    "gold_per_min" : record => record.benchmarks.gold_per_min.raw,
    "kills_per_min" : record => record.kills_per_min || 0,
    "hero_damage_per_min" : record => record.benchmarks.hero_damage_per_min.raw || 0,
    // "total_xp" : record => record.total_xp,
    "xp_per_min" : record => record.benchmarks.xp_per_min.raw,
    "tower_damage_per_min" : record => record.tower_damage / to_duration_min(record),
    "last_hits_per_min" : record => record.benchmarks.last_hits_per_min.raw,
    // "black_king_bar_uses_per_minute"
    // "net_worth" : record => record.net_worth
}

// for (const item of items) {
// 	accessorMap[`uses_${item}_per_min`] = record => record.item_uses && record.item_uses[item] ? record.item_uses[item] / to_duration_min(record) : null 
// }

// for (const inflictor of inflictors) {
// 	accessorMap[`inflictor_${inflictor}_per_min`] = record => record.damage_inflictor && record.damage_inflictor[inflictor] ? record.damage_inflictor[inflictor] / to_duration_min(record) : null 
// }

// for (const ability of abilities) {
// 	accessorMap[`uses_${ability}_per_min`] = record => record.ability_uses && record.ability_uses[ability] ? record.ability_uses[ability] / to_duration_min(record) : null 
// }