import React, { useState } from "react";
import { Text, View, Button, FlatList, TouchableOpacity, ListItem, ScrollView, StyleSheet, Image, Modal } from "react-native";
import tw from "tailwind-react-native-classnames";

// To run db server
// npx json-server --watch database/data.json --port 8000



const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setError] = useState(null);
  
    useEffect(() => {
      const abortCont = new AbortController();
  
      setTimeout(() => {
        fetch(url, { signal: abortCont.signal })
          .then((res) => {
            if (!res.ok) {
              throw Error("Something went wrong");
            }
            return res.json();
          })
          .then((d) => {
            setData(d);
            setIsLoading(false);
            setError(null);
          })
          .catch((e) => {
            if (e.name === "AbortError") console.log("fetch aborted");
            else {
              setIsLoading(false);
              setError(e.message);
            }
          });
      }, 500);
  
      return () => abortCont.abort();
    }, [url]);
    console.log('data')
    console.log(data)
    return { data, isLoading, err };
      
};
  
export default useFetch;