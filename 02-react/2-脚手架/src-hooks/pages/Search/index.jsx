import React, { useState } from "react";
import PubSub from "pubsub-js";
export default function Search() {
  const [searchName, searchName] = useState("");
  const handleChange = (e) => {
    setSearchName(e.target.value.trim());
  };
  const handleClick = () => {
    if (searchName) {
      PubSub.publish("SEARCHNAME", searchName);
    }
  };
  return (
    <section className="jumbotron">
      <h3 className="jumbotron-heading">Search Github Users</h3>
      <div>
        <input
          type="text"
          placeholder="enter the name you search"
          onClick={handleClick}
        />
        <button onClick={handleClick}>Search</button>
      </div>
    </section>
  );
}
