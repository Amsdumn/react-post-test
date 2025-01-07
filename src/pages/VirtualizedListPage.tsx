import React, { useState, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import PaginatedProvinces from "../components/PaginatedProvinces";

interface ItemProps {
  index: number;
  style: React.CSSProperties;
}

// จำนวนเริ่มต้นของข้อมูล
const INITIAL_DATA = Array.from({ length: 100000 }, (_, index) => `Item ${index + 1}`);

const VirtualizedListPage: React.FC = () => {
  const [items, setItems] = useState<string[]>(INITIAL_DATA);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // เพิ่มตัวแปรเพื่อตรวจสอบว่าโหลดครบหรือยัง

  // ตรวจสอบว่าแถวนี้ถูกโหลดหรือยัง
  const isItemLoaded = (index: number): boolean => index < items.length;

  // ฟังก์ชันโหลดข้อมูลเพิ่มเติม
  const loadMoreItems = useCallback(async () => {
    if (isNextPageLoading) return;

    setIsNextPageLoading(true);

    // จำลองการโหลดข้อมูลเพิ่มเติม (อาจมาจาก API หรือไฟล์ JSON)
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

  // แสดงแต่ละแถว
  const Row: React.FC<ItemProps> = ({ index, style }) => (
    <div
      style={style}
      className={`flex items-center ${isItemLoaded(index) ? 'justify-start' : 'justify-center'}`}
    >
      {isItemLoaded(index) ? items[index] : "Loading..."}
    </div>
  );

  return (
    <div className="container min-h-screen max-w-80 mx-auto p-4 space-y-10">
      <h1 className="text-xl font-bold text-center mb-4">Virtualized List & Infinite Scroll</h1>
      <InfiniteLoader
        isItemLoaded={isItemLoaded} // ตรวจสอบว่าข้อมูลโหลดหรือยัง
        itemCount={hasMore ? items.length + 1 : items.length} // หยุดเพิ่มแถวใหม่เมื่อไม่มีข้อมูล // จำนวนรายการทั้งหมด
        loadMoreItems={loadMoreItems} // ฟังก์ชันโหลดข้อมูลเพิ่มเติม
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={200} // ความสูงของหน้าจอ List
            itemCount={items.length + 1} // จำนวนรายการทั้งหมด
            itemSize={40} // ความสูงของแต่ละแถว (px)
            width="100%" // ความกว้างของ List
            onItemsRendered={onItemsRendered} // แจ้ง InfiniteLoader เมื่อเลื่อน
            ref={ref} // เชื่อมต่อกับ InfiniteLoader
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
