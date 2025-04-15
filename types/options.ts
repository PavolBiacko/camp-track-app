export type TabScreenOptions = {
  tabBarShowLabel: boolean;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
  tabBarActiveBackgroundColor: string;
  tabBarInactiveBackgroundColor: string;
  tabBarStyle: {
    borderColor: string;
    borderTopWidth: number;
    height: number;
  };
  sceneStyle: {
    backgroundColor: string;
  };
}

export type StackScreenOptions = {
  animation?: "none" | "slide_from_right" | "slide_from_left" | "fade" | "fade_from_bottom" | "flip" | "simple_push" | "ios_from_right" | "ios_from_left" | undefined;
  headerShown?: boolean;
  headerStyle?: {
    backgroundColor: string;
  };
  headerTitleStyle?: {
    color: string;
  };
  headerTitleAlign: "left" | "center";
  headerTintColor?: string;
  contentStyle?: {
    backgroundColor: string;
  };
}