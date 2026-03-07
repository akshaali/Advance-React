import React, { JSX, useCallback, useEffect, useRef, useState } from "react";
const END_POINT_URL = "https://dummyjson.com/quotes";
const PAGE_SIZE = 30;

interface QuotesInterface {
  id: number;
  quote: string;
  author: string;
}

interface QuotesAPIInterface {
  quotes: QuotesInterface[];
  total: number;
  skip: number;
  limit: number;
}

const fetchQuotesDataAPI = (
  pageNumber: number,
): Promise<QuotesAPIInterface> => {
  const skip = pageNumber * PAGE_SIZE;
  return new Promise((resolve, reject) => {
    fetch(`${END_POINT_URL}?skip=${skip}&limit=${PAGE_SIZE}`)
      .then(async (result) => {
        const response = await result.json();
        return response;
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log("errorrr", err);
        reject("failed to load more....");
      });
  });
};

const InfiniteScrolling = (): JSX.Element => {
  const [data, setData] = useState<QuotesInterface[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const loadMoreRef = useRef(null);

  const loadData = useCallback(async () => {
    if (isLoading || !hasMore) return;
    try {
      setIsLoading(true);
      const response: QuotesAPIInterface = await fetchQuotesDataAPI(pageNumber);
      console.log("response==>", response);
      setData((prevData) => [...prevData, ...response.quotes]);
      setPageNumber((prevPage) => prevPage + 1);
      if (data.length < response.total) setHasMore(true);
    } catch (err: unknown) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, data.length, pageNumber]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const options = {
      root: null, // Use the document viewport as the root
      rootMargin: "10px", // prefetch earlier
      threshold: 0.5, // Trigger when 50% of the target is visible
    };
    const handleIntersection = (entries: any) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadData();
      }
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadData]);

  console.log("datadata", data, hasMore);

  return (
    <div>
      <h2>Infinite scrolling list </h2>
      {data.map((item: QuotesInterface) => {
        return (
          <div
            style={{
              border: 1,
              borderColor: "red",
              backgroundColor: "grey",
              padding: 16,
              margin: 16,
            }}
            key={item.id}
          >
            <h4>{item.author}</h4>
            <div>{item.quote}</div>
          </div>
        );
      })}

      <div ref={loadMoreRef} style={{ height: 1 }} />

      {isLoading && <p>Loading…</p>}

      {error && (
        <button onClick={loadData} style={{ color: "red" }}>
          {error} – Tap to retry
        </button>
      )}

      {!hasMore && <p>You're all cought up!!</p>}
    </div>
  );
};

export default InfiniteScrolling;
