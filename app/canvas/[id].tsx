import { CanvasView } from "@/components/canvas/CanvasView";
import { useLocalSearchParams } from "expo-router";
import { RoomProvider } from "@/liveblocks.config";
import { LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types";

export default function Canvas() {
  const { id } = useLocalSearchParams();

  if (!id || typeof id !== "string") return null;

  const initialStorage = {
    layerIds: [],
    layers: new LiveMap<string, LiveObject<Layer>>(),
  };

  return (
    <RoomProvider
      id={`room:${id}`}
      initialPresence={{}}
      initialStorage={initialStorage}
    >
      <CanvasView />
    </RoomProvider>
  );
}
