import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as Io5Icons from 'react-icons/io5';
import * as GiIcons from 'react-icons/gi';

export const NavBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />
    },
    {
        title: 'Appliances',
        path: '/appliances',
        icon: <AiIcons.AiFillThunderbolt />
    },
    {
        title: 'Rooms',
        path: '/rooms',
        icon: <GiIcons.GiDoor />
    },
    {
        title: 'Costs',
        path: '/costs',
        icon: <AiIcons.AiOutlineDollarCircle />
    },
    {
        title: 'Notifications',
        path: '/notifications',
        icon: <AiIcons.AiOutlineBell />
    }
];
