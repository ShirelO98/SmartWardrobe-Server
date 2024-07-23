const { query } = require("../db");

let lookscreated = false;

const fetchItems = async (wardrobeCode) => {
    const items = await query('SELECT * FROM tbl_101_item where wardrobe_code = ?', [wardrobeCode]);
    return items;
};

const groupItemsBySeasonAndType = (items) => {
    const itemsBySeasonAndType = {};

    items.forEach(item => {
        if (!itemsBySeasonAndType[item.item_season]) {
            itemsBySeasonAndType[item.item_season] = { shirts: [], pants: [], shoes: [] };
        }
        if (!itemsBySeasonAndType['All Seasons']) {
            itemsBySeasonAndType['All Seasons'] = { shirts: [], pants: [], shoes: [] };
        }

        if (item.item_type === 'Shirt') {
            itemsBySeasonAndType[item.item_season].shirts.push(item);
            if (item.item_season !== 'All Seasons') {
                itemsBySeasonAndType['All Seasons'].shirts.push(item);
            }
        } else if (item.item_type === 'Pants') {
            itemsBySeasonAndType[item.item_season].pants.push(item);
            if (item.item_season !== 'All Seasons') {
                itemsBySeasonAndType['All Seasons'].pants.push(item);
            }
        } else if (item.item_type === 'Shoes') {
            itemsBySeasonAndType[item.item_season].shoes.push(item);
            if (item.item_season !== 'All Seasons') {
                itemsBySeasonAndType['All Seasons'].shoes.push(item);
            }
        }
    });
    return itemsBySeasonAndType;
};

const createLooksFromGroupedItems = (itemsBySeasonAndType) => {
    let looks = [];
    const uniqueLooks = new Set();

    for (const season in itemsBySeasonAndType) {
        if (season === 'All Seasons') continue;

        const { shirts, pants, shoes } = itemsBySeasonAndType[season];
        const allSeasonShirts = itemsBySeasonAndType['All Seasons'].shirts;
        const allSeasonPants = itemsBySeasonAndType['All Seasons'].pants;
        const allSeasonShoes = itemsBySeasonAndType['All Seasons'].shoes;

        const combinedShirts = shirts.concat(allSeasonShirts);
        const combinedPants = pants.concat(allSeasonPants);
        const combinedShoes = shoes.concat(allSeasonShoes);

        for (let i = 0; i < combinedShirts.length; i++) {
            for (let j = 0; j < combinedPants.length; j++) {
                for (let k = 0; k < combinedShoes.length; k++) {
                    const shirtSeason = combinedShirts[i].item_season;
                    const pantsSeason = combinedPants[j].item_season;
                    const shoesSeason = combinedShoes[k].item_season;

                    // Check if all items have the same season or if one of the seasons is 'All Seasons'
                    if ((shirtSeason === pantsSeason || shirtSeason === 'All Seasons' || pantsSeason === 'All Seasons') &&
                        (shirtSeason === shoesSeason || shirtSeason === 'All Seasons' || shoesSeason === 'All Seasons') &&
                        (pantsSeason === shoesSeason || pantsSeason === 'All Seasons' || shoesSeason === 'All Seasons')) {

                        if (combinedShirts[i].item_color !== combinedPants[j].item_color &&
                            combinedShirts[i].item_color !== combinedShoes[k].item_color &&
                            combinedPants[j].item_color !== combinedShoes[k].item_color) {

                            const lookStatus = combinedShirts[i].item_status && combinedPants[j].item_status && combinedShoes[k].item_status;

                            const lookIdentifier = `${combinedShirts[i].id}-${combinedPants[j].id}-${combinedShoes[k].id}`;
                            if (!uniqueLooks.has(lookIdentifier)) {
                                uniqueLooks.add(lookIdentifier);
                                looks.push({
                                    item_id_1: combinedShirts[i].id,
                                    item_id_2: combinedPants[j].id,
                                    item_id_3: combinedShoes[k].id,
                                    look_status: lookStatus
                                });
                            }
                        }
                    }
                }
            }
        }
    }
    return looks;
};

const insertLooksIntoDatabase = async (looks, wardrobeCode) => {
    for (const look of looks) {
        await query('INSERT INTO tbl_101_looks (item_id_1, item_id_2, item_id_3, look_status, wardrobe_code) VALUES (?, ?, ?, ?, ?)',
            [look.item_id_1, look.item_id_2, look.item_id_3, look.look_status, wardrobeCode]);
    }
};

async function createLooks(wardrobeCode) {
    try {
        const items = await fetchItems(wardrobeCode);
        const itemsBySeasonAndType = groupItemsBySeasonAndType(items);
        const looks = createLooksFromGroupedItems(itemsBySeasonAndType);
        await insertLooksIntoDatabase(looks, wardrobeCode);
        console.log('Looks created successfully!');
    } catch (error) {
        console.error('Error creating looks:', error);
    }
}

fetchWardrobes = async () => {
    const looks = await query("SELECT wardrobe_code FROM tbl_101_wardrobes_of_user");
    const wardrobeCodes = looks.map(row => row.wardrobe_code)
    return wardrobeCodes;
}

initLooksForAllWardrobes = async () => {
    const wardrobeCodes = await fetchWardrobes();
    for (const wardrobeCode of wardrobeCodes) {
        await createLooks(wardrobeCode);
    }
    lookscreated = true;
    console.log('Looks created for all wardrobes successfully!');
}



async function getAllLooks(req, res) {
    if (!lookscreated) {
        await initLooksForAllWardrobes();
    }
    const {wardrobeCode} = req.params;
    if (!wardrobeCode) {
        return res.status(400).json({ error: "Missing Field" });
    }
    try {
        const looks = await query(
            "SELECT * FROM tbl_101_looks WHERE wardrobe_code = ?",
            [wardrobeCode]
        );
        res.json(looks);
    } catch (err) {
        console.error("Failed to get looks:", err);
        res.status(500).json({ error: "Failed to get looks" });
    }
}

async function getLook(req, res) {
    if (!lookscreated) {
        await initLooksForAllWardrobes();
    }
}


async function deleteLook(req, res) {
    if (!lookscreated) {
        await initLooksForAllWardrobes();
    }

}








module.exports = {
    lookController: {
        getAllLooks,
        getLook,
        deleteLook,
    },
};