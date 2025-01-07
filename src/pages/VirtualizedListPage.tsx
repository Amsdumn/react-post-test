import React, { useState, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import PaginatedProvinces from "../components/PaginatedProvinces";

interface ItemProps {
  index: number;
  style: React.CSSProperties;
}

const INITIAL_DATA = Array.from({ length: 100000 }, (_, index) => `Item ${index + 1}`);

const VirtualizedListPage: React.FC = () => {
  const [items, setItems] = useState<string[]>(INITIAL_DATA);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isItemLoaded = (index: number): boolean => index < items.length;

  const loadMoreItems = useCallback(async () => {
    if (isNextPageLoading) return;

    setIsNextPageLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch("/complete_provinces_regions.json");
    const data = await response.json();
    const newItems = data.map((item: any) => (`${item.name_th} (${item.name_en})`))
    if (newItems.length === 0) {
      setHasMore(false);
    } else {
      setItems((prevItems) => [...prevItems, ...newItems]);
    }

    setIsNextPageLoading(false);
  }, [isNextPageLoading, items, hasMore]);

  const Row: React.FC<ItemProps> = ({ index, style }) => (
    <div
      style={style}
      className={`flex items-center ${isItemLoaded(index) ? 'justify-start' : 'justify-center'}`}
    >
      {isItemLoaded(index) ? items[index] : "Loading..."}
    </div>
  );

  return (
    <div className="container min-h-screen mx-auto p-4 space-y-10 pt-20">
      <h1 className="text-xl font-bold text-center mb-4 dark:text-white">Virtualized List & Infinite Scroll</h1>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={hasMore ? items.length + 1 : items.length}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={200}
            itemCount={items.length + 1}
            itemSize={40}
            width="100%"
            onItemsRendered={onItemsRendered}
            ref={ref}
            className="dark:text-white"
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
      <PaginatedProvinces />
    </div>
  );
};

export default VirtualizedListPage;
