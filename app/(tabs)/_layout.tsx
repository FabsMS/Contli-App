import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { NavBar } from '@/components/ui/navbar';

export default function TabLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const getCurrentRoute = (): string => {
    if (pathname === '/' || pathname.includes('/index')) return 'home';
    if (pathname.includes('/clients')) return 'clients';
    if (pathname.includes('/moviment')) return 'moviment';
    if (pathname.includes('/record')) return 'record';
    if (pathname.includes('/settings')) return 'settings';
    return 'home';
  };

  const handleNavigate = (route: string) => {
    const routeMap: { [key: string]: string } = {
      home: '/(tabs)/',
      clients: '/(tabs)/clients',
      moviment: '/(tabs)/moviment',
      record: '/(tabs)/record',
      settings: '/(tabs)/settings',
    };
    router.push(routeMap[route] as any);
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => (
        <NavBar currentRoute={getCurrentRoute()} onNavigate={handleNavigate} />
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="clients" />
      <Tabs.Screen name="moviment" />
      <Tabs.Screen name="record" />
      <Tabs.Screen name="settings" />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
