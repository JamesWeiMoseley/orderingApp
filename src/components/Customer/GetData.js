import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

const GetData = (clicked) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResult = await API.graphql(
          graphqlOperation(queries.listItems)
        );
        setItems(postsResult.data.listItems.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, [clicked]);

  return { items };
};

export default GetData;
