import { table, getMinifiedRecords } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    //find a record
    const { id, name, address, neighborhood, imgUrl, voting } = req.body;

    try {
      if (id) {
        // console.log('req body', req.body);

        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
          //create a new record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  imgUrl,
                  voting,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);

            res.json({
              records,
            });
          } else {
            res.status(400);
            res.json({
              message: "id or name is missing",
            });
          }
        }
      } else {
        res.status(400);
        res.json({
          message: "id is missing",
        });
      }
    } catch (err) {
      console.error("Error creating or finding store", err);
      res.status(500);
      res.json({
        message: "Error creating or finding store",
        err,
      });
    }
  }
};

export default createCoffeeStore;
