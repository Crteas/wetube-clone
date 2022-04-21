export const helloPru = (req, res) => res.send("Pru!!");

export const herolist = (req, res) => res.send(`${req.params.heros}`);

export const finalfantazy = (req, res) => res.send("ff14!");
