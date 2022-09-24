import { useState, useEffect, Fragment } from "react";

const DemoComponent = () => {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  const [clicks, setClicks] = useState(0);

  const incrementClicks = () => {
    setClicks(clicks + 1);
    console.log(clicks);
  };

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    if (clicks) {
      fetch("/api/first_api", {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [clicks]);
  let data;
  if (clicks) {
    if (error) {
      data = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      data = <div>Loading...</div>;
    } else if (items.message) {
      data = (
        <div>
          Clicks: {clicks} Data: {items.message}
        </div>
      );
    }
  }
  return (
    <Fragment>
      <button variant="dark" onClick={incrementClicks}>
        First API
      </button>
      {data}
    </Fragment>
  );
};

export { DemoComponent };
