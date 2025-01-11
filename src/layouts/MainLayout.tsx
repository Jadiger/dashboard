import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Aside from "./aside";
import { Outlet } from "react-router";
// import { MantineLogo } from "@mantinex/mantine-logo";

export default function MainLayout () {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md : 300},
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
          <h1 className="text-3xl font-semibold">Jadiger</h1>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Aside toggle = {toggle}/>
      </AppShell.Navbar>
      <AppShell.Main className="bg-slate-200" >
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}
