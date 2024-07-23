const { query } = require("../db");

let lookcreated = false;

const fetchItems = async () => {
    const items = await query('SELECT * FROM tbl_101_item', []);
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

const insertLooksIntoDatabase = async (looks) => {
    for (const look of looks) {
        await query('INSERT INTO tbl_101_looks (item_id_1, item_id_2, item_id_3, look_status) VALUES (?, ?, ?, ?)',
            [look.item_id_1, look.item_id_2, look.item_id_3, look.look_status]);
    }
};

async function createLooks() {
    try {
        const items = await fetchItems();
        const itemsBySeasonAndType = groupItemsBySeasonAndType(items);
        const looks = createLooksFromGroupedItems(itemsBySeasonAndType);
        await insertLooksIntoDatabase(looks);
        console.log('Looks created successfully!');
        lookcreated = true;
    } catch (error) {
        console.error('Error creating looks:', error);
    }
}

async function getAllLooks(req, res) {
    if (!lookcreated) {
        await createLooks();
    }
}

async function getLook(req, res) {
    if (!lookcreated) {
        await createLooks();
    }
}


async function deleteLook(req, res) {
    if (!lookcreated) {
        await createLooks();
    }

}








module.exports = {
    lookController: {
        getAllLooks,
        getLook,
        deleteLook,
    },
};