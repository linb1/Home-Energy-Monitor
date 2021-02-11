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
        title: 'Electricity',
        path: '/electricity',
        icon: <AiIcons.AiFillThunderbolt />
    },
    {
        title: 'Statistics',
        path: '/statistics',
        icon: <Io5Icons.IoStatsChart />
    },
    {
        title: 'Solar',
        path: '/solar',
        icon: <Io5Icons.IoSunny />
    },
    {
        title: 'Fill 2',
        path: '/fill_2',
        icon: <GiIcons.GiGearHammer />
    }
];
