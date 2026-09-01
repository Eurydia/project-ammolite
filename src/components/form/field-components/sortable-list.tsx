import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import DragIndicator from "@mui/icons-material/DragIndicator";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

type SortableListItemProps<T> = {
  id: UniqueIdentifier;
  index: number;
  item: T;
  itemCount: number;
  onMove: (fromIndex: number, toIndex: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
};

const SortableListItem = <T,>({
  id,
  index,
  item,
  itemCount,
  onMove,
  renderItem,
}: SortableListItemProps<T>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      sx={{
        bgcolor: "background.default",
        border: 1,
        borderColor: isDragging ? "primary.main" : "divider",
        opacity: isDragging ? 0.5 : 1,
        p: 1.25,
        position: "relative",
        zIndex: isDragging ? 1 : "auto",
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
            {...attributes}
            {...listeners}
            aria-label={`Drag item ${index + 1}`}
            size="small"
            sx={{ touchAction: "none" }}
            type="button"
          >
            <DragIndicator />
          </IconButton>
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
  getItemId?: (item: T, index: number) => UniqueIdentifier;
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
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const itemIds = items.map(
    (item, index) => getItemId?.(item, index) ?? `sortable-item-${index}`,
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over === null || active.id === over.id) {
      return;
    }

    const fromIndex = itemIds.indexOf(active.id);
    const toIndex = itemIds.indexOf(over.id);
    if (fromIndex !== -1 && toIndex !== -1) {
      onMove(fromIndex, toIndex);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <Stack spacing={2}>
          {items.map((item, index) => (
            <SortableListItem
              id={itemIds[index]}
              index={index}
              item={item}
              itemCount={items.length}
              key={itemIds[index]}
              onMove={onMove}
              renderItem={renderItem}
            />
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  );
};
