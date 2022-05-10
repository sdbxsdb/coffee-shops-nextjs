import { findRecordByFilter } from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      const records = await findRecordByFilter(id);

      if (id) {
        if (records.length !== 0) {
          res.json(records);
        } else {
          res.json({
            message: `Coffee Store ID doesnt exist`,
            id: `${id}`,
          });
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }

    } catch (err) {
      res.json({ message: "Error upvoting coffee store", err: err });
      res.status(500);
    }
  } 

};

export default favouriteCoffeeStoreById;
