import { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { Colors } from "@/constants/theme";

const { height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  // Valores animados para cada elemento
  const logoTranslateY = useSharedValue(0);
  const titleTranslateY = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Calcular a distância que cada elemento precisa se mover
    // Para centralizar na tela e depois subir para a posição final
    const centerOffset = height / 2 - 200; // Aproximadamente o centro da tela
    const finalTopPosition = -centerOffset + 100; // Posição final no topo

    // Inicia a animação após um pequeno delay
    setTimeout(() => {
      // Anima os elementos subindo
      logoTranslateY.value = withTiming(finalTopPosition, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      titleTranslateY.value = withTiming(finalTopPosition + 20, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      subtitleTranslateY.value = withTiming(finalTopPosition + 30, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      // Após a animação de subida, navega para o login
      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    }, 500);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoTranslateY.value }],
    opacity: opacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleTranslateY.value }],
    opacity: opacity.value,
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: subtitleTranslateY.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <Image
            source={require("@/assets/icons/icon-contli.svg")}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
          <Image
            source={require("@/assets/images/title-contli.svg")}
            style={styles.title}
            contentFit="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.subtitleContainer, subtitleAnimatedStyle]}>
          <Image
            source={require("@/assets/images/subtitle-contli.svg")}
            style={styles.subtitle}
            contentFit="contain"
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    width: 200,
    height: 60,
  },
  subtitleContainer: {
    marginTop: 4,
  },
  subtitle: {
    width: 240,
    height: 30,
  },
});
