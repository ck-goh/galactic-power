var power = {
    "power_per_level": [
        1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39,
        42, 46.5, 51, 55.5, 60, 64.5, 69, 73.5, 79.5, 85.5, 91.5, 97.5, 103.5, 111, 118.5, 126, 133.5,
        142.5, 151.5, 160.5, 169.5, 180, 190.5, 201, 213, 225, 238.5, 252, 265.5, 280.5, 295.5, 312, 328.5, 346.5,
        366, 385.5, 406.5, 429, 451.5, 475.5, 501, 528, 556.5, 586.5, 618, 651, 685.5, 721.5, 759, 798, 840,
        883.5, 928.5, 976.5, 1027.5, 1080, 1135.5, 1194, 1255.5, 1320, 1387.5, 1458, 1533, 1612.5, 1696.5, 1785, 1878, 1975.5
    ],
    "power_per_gear_tier": [ 10.5, 33, 42, 55.5, 66, 84, 112.5, 121.5, 142.5, 177, 198, 210 ],
    "power_per_gear_base": [ 0, 63, 261, 513, 846, 1242, 1746, 2421, 3150, 4005, 5067, 6255 ],
    "power_per_ability": [ 0, 0, 42, 97.5, 163.5, 276, 397.5, 574.5, 784.5, 2980.5 ],
    "power_per_rarity": [ 300, 450, 675, 1012.5, 1519.5, 2659.5, 4654.5 ],
    "power_per_mod_star_level": [
        [ 1.5, 3, 4.5, 6, 7.5, 9, 12, 13.5, 15, 16.5, 18, 19.5, 21, 24, 25.5 ],
        [ 1.5, 3, 4.5, 6, 7.5, 9, 12, 13.5, 15, 16.5, 19.5, 21, 22.5, 25.5, 27 ],
        [ 1.5, 3, 6, 9, 12, 16.5, 21, 25.5, 30, 36, 27, 40.5, 52.5, 58.5, 66 ],
        [ 1.5, 4.5, 7.5, 12, 18, 24, 30, 39, 46.5, 55.5, 66, 76.5, 88.5, 100.5, 114 ],
        [ 1.5, 4.5, 9, 15, 22.5, 31.5, 42, 54, 67.5, 82.5, 99, 117, 136.5, 157.5, 180 ]
    ]
};

$(function() {
    var mod_power = function(m) {
        var stars = $("#mod_stars_" + m).val();
        if (+stars === -1) { return 0; }
        return power.power_per_mod_star_level[+stars][$("#mod_level_" + m).val() - 1];
    };

    var recalc = function() {
        var from_level = power.power_per_level[level.value - 1];
        var from_rarity = power.power_per_rarity[rarity.value - 1];
        var from_mods = mod_power(1) + mod_power(2) + mod_power(3) + mod_power(4) + mod_power(5) + mod_power(6);
        var gear_base = power.power_per_gear_base[geartier.value - 1];
        var from_gear = gear_base + power.power_per_gear_tier[geartier.value - 1] * gearslots.value;
        var from_skills = [1,2,3,4,5,6].reduce((s,v) => s+power.power_per_ability[+$("#ability_"+v).val()+1], 0);

        power_level.value = from_level;
        power_rarity.value = from_rarity;
        power_mods.value = from_mods;
        power_gear.value = from_gear;
        power_abilities.value = from_skills;
        power_total.value = Math.floor(from_level + from_rarity + from_mods + from_gear + from_skills);
    };

    $('input').on('input', recalc);
    $('select').on('change', recalc);

    recalc();
});
