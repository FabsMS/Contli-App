import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Aguarda o layout estar pronto antes de navegar
    const timer = setTimeout(() => {
      router.replace("/splash");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Renderiza uma view vazia enquanto redireciona
  return <View style={{ flex: 1, backgroundColor: "#FFFFFF" }} />;
}
