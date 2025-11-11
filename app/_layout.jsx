import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Landing',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="example/example"
        options={{
          title: 'Example',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="post/home"
        options={{
          title: 'Post Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
       />
       <Tabs.Screen
        name="signup/signup"
        options={{
          title: 'Signup',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="login/login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="login/profile_page"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create-post/create-post"
        options={{
          title: 'Create Post',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    
  );
}
