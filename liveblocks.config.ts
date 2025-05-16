// import {
//   createClient,
//   LiveObject,
//   LiveMap,
//   LiveList,
//   LsonObject,
// } from "@liveblocks/client";
import * as SecureStore from "expo-secure-store";
import { createRoomContext } from "@liveblocks/react";

// import type { Color, Layer } from "@/types";

// // let client: ReturnType<typeof createClient>;

// // export async function initLiveblocks(roomId: string) {
// //   const token = await SecureStore.getItemAsync("authToken");

// //   if (!token) {
// //     throw new Error("No auth token found");
// //   }

// //   if (!client) {
// //     client = createClient({
// //       authEndpoint: async () => {
// //         const res = await fetch(
// //           "https://rta-studio.vercel.app/api/liveblocks-auth",
// //           {
// //             method: "POST",
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         if (!res.ok) {
// //           throw new Error("Liveblocks authentication failed");
// //         }

// //         const data = await res.json();
// //         return {
// //           token: data.token,
// //         };
// //       },
// //     });
// //   }

// //   const { room } = client.enterRoom(roomId);
// //   await room.getStorage();
// //   return room;
// // }

// type StorageSchema = {
//   roomColor: Color | null;
//   layers: LiveMap<string, LiveObject<Layer>>;
//   layerIds: LiveList<string>;
// };

// const client = createClient<StorageSchema>({
//   authEndpoint: async () => {
//     const token = await SecureStore.getItemAsync("authToken");
//     if (!token) {
//       throw new Error("No auth token found");
//     }

//     console.log("token", token);
//     console.log("✅ Token being sent to Liveblocks:", token);
//     const res = await fetch(
//       "https://rta-studio.vercel.app/api/liveblocks-auth",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Liveblocks authentication failed");
//     }

//     const data = await res.json();
//     return {
//       token: data.token,
//     };
//   },
// });

import { createClient } from "@liveblocks/client";

// The typings are inferred from the global declaration
const client = createClient({
  authEndpoint: async () => {
    const token = await SecureStore.getItemAsync("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }

    const res = await fetch(
      "https://rta-studio.vercel.app/api/liveblocks-auth",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Liveblocks authentication failed");
    }

    const data = await res.json();
    return {
      token: data.token,
    };
  },
});

export const {
  RoomProvider,
  useOthers,
  useMyPresence,
  useStorage,
  useUpdateMyPresence,
} = createRoomContext(client);
