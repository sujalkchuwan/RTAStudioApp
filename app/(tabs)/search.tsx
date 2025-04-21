import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { images } from "@/constants/images";

export default function search() {
  const sharedFiles = [
    {
      id: "1",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
    {
      id: "2",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
    {
      id: "3",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
    {
      id: "4",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
    {
      id: "5",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
  ];

  const userProjects = [
    {
      id: "1",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
    {
      id: "2",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
    {
      id: "3",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
    {
      id: "4",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
    {
      id: "5",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
    {
      id: "6",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
      name: "Textile Design 1",
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6 gap-4 mt-10">
      {/* Search Bar */}
      <Text className="text-4xl font-semibold text-black">Search</Text>
      <TextInput
  placeholder="Find files"
  placeholderTextColor="#9ca3af" // Optional: Tailwind's gray-400
  className="bg-white px-4 py-3 rounded-xl  text-base text-gray-800 mb-6 border border-gray-200"
/>

      {/* Shared Files Section */}
      <Text className="text-lg font-semibold mb-2">Shared with You</Text>
      <FlatList
        data={sharedFiles}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="mr-4">
            <Image
              source={{ uri: item.image }}
              className="w-32 h-24 rounded-lg"
            />
            <Text className="text-sm font-medium">{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* User Projects Section */}
      <Text className="text-lg font-semibold mt-6 mb-2">Your Projects</Text>
      <FlatList
        data={userProjects}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="mb-4 flex-row items-center">
            <Image
              source={{ uri: item.image }}
              className="w-32 h-24 rounded-lg mr-3"
            />
            <View>
              <Text className="text-base font-medium">{item.name}</Text>
              <Text className="text-gray-500 text-sm">Viewed an hour ago</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
