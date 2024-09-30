

"use client"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle,Tabs,Tab } from "@nextui-org/react";
import React from "react";

import {usePathname} from "next/navigation";

function NavApp() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [{
        path:"/dashboard",
        name:"Reportes"
    },
    {
        path:"/users",
        name:"Conductores"
    },
    
    ];

    const pathname = usePathname();
    console.log(pathname)
    return (
        <Navbar style={{ width: "100%" }} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <img width={20} height={20} src="https://res.cloudinary.com/ddksrkond/image/upload/v1724549272/trackingapp/u6jqxxumfd8njqg2hgdt.png" alt="" />
                    <p>Track</p>
                    <p className="font-bold text-inherit">BusIlo</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <Tabs  selectedKey={pathname}>
      <Tab key="/dashboard"  title="Reportes" href="/dashboard">
             </Tab>
      <Tab key="/users" title="Conductores" href="/users">
             </Tab>
    
    </Tabs>
                          </NavbarContent>
            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="admintrackbusilo@gmail.com"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Iniciado como</p>
                            <p className="font-semibold">admintrackbusilo@gmail.com</p>
                        </DropdownItem>
                        
                        <DropdownItem key="logout" color="danger">
                            Cerrar  Session
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href={item.path}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
export default NavApp

