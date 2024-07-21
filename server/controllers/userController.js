exports.userController = {
  async getWardrobes(req, res) {
    console.log("user")

    res.json({ message: "Get wardrobes" });
  },
  async addWardrobe(req, res) {
    const { name } = req.params;
    console.log(`name: ${name}`);

    res.json({ message: "Wardrobe added" });
  },
  async updateWardrobe(req, res) {
    const { wardrobeID, newName } = req.params;
    console.log(`Wardrobe ID: ${wardrobeID}, New Name: ${newName}`);

    res.json({ message: "Wardrobe updated" });
  },
  async deleteWardrobe(req, res) {
    const { wardrobeID } = req.params;
    console.log(`Wardrobe ID: ${wardrobeID}`);

    res.json({ message: "Wardrobe deleted" });
  },
};
