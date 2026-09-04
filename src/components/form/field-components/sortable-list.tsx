import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

type SortableListItemProps<T> = {
  index: number;
  item: T;
  itemCount: number;
  onMove: (fromIndex: number, toIndex: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
};

const SortableListItem = <T,>({
  index,
  item,
  itemCount,
  onMove,
  renderItem,
}: SortableListItemProps<T>) => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        border: 1,
        borderColor: "divider",
        p: 1.25,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
        <Stack
          spacing={0.5}
          sx={{
            alignSelf: "stretch",
            borderColor: "divider",
            borderRight: 1,
            pr: 1,
          }}
        >
          <IconButton
            aria-label={`Move item ${index + 1} up`}
            disabled={index === 0}
            onClick={() => onMove(index, index - 1)}
            size="small"
            type="button"
          >
            <ArrowUpward />
          </IconButton>
          <IconButton
            aria-label={`Move item ${index + 1} down`}
            disabled={index === itemCount - 1}
            onClick={() => onMove(index, index + 1)}
            size="small"
            type="button"
          >
            <ArrowDownward />
          </IconButton>
        </Stack>
        <Box sx={{ flex: 1, minWidth: 0 }}>{renderItem(item, index)}</Box>
      </Stack>
    </Box>
  );
};

type SortableListProps<T> = {
  getItemId?: (item: T, index: number) => string | number;
  items: readonly T[];
  onMove: (fromIndex: number, toIndex: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
};

export const SortableList = <T,>({
  getItemId,
  items,
  onMove,
  renderItem,
}: SortableListProps<T>) => {
  const itemKeys = items.map(
    (item, index) => getItemId?.(item, index) ?? index,
  );

  return (
    <Stack spacing={2}>
      {items.map((item, index) => (
        <SortableListItem
          index={index}
          item={item}
          itemCount={items.length}
          key={itemKeys[index]}
          onMove={onMove}
          renderItem={renderItem}
        />
      ))}
    </Stack>
  );
};
