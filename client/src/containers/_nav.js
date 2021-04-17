export default [{
    _name: 'CSidebarNav',
    _children: [{
        _name: 'CSidebarNavItem',
        name: 'Ana Sayfa',
        to: '/anasayfa',
        icon: 'cil-home'
    },
    {
        _name: 'CSidebarNavTitle',
        _children: ['İşlemler']
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Oyuncaklar',
        to: '/oyuncakislemleri',
        icon: 'cil-puzzle'
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Masallar',
        to: '/masalislemleri',
        icon: 'cil-book'
    },
    {
        _name: 'CSidebarNavDropdown',
        name: 'Müzikler',
        icon: 'cil-music-note',
        items: [{
            name: 'Müzik İşlemleri',
            to: '/muzikler'
        },
        {
            name: 'Müzik Kategorileri',
            to: '/muzikkategori'
        },
        ]
    },
    {
        _name: 'CSidebarNavDropdown',
        name: 'Blog',
        icon: 'cil-mug-tea',
        items: [{
            name: 'Blog İşlemleri',
            to: '/blog'
        },
        {
            name: 'Blog Kategorileri',
            to: '/blogkategori'
        },
        ]
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Tarifler',
        icon: 'cil-mug-tea',
        to: '/tarif',

    },
    {
        _name: 'CSidebarNavItem',
        name: 'Aylık Bebek Gelişimi',
        to: '/abebekgelisimi',
        icon: 'cil-baby-carriage'
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Haftalık Bebek Gelişimi',
        to: '/hbebekgelisimi',
        icon: 'cil-baby'
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Yönetici İşlemleri',
        to: '/yonetici',
        icon: 'cil-user'
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Kullanıcı İşlemleri',
        to: '/kullanici',
        icon: 'cil-people'
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Banner',
        to: '/keywords',
        icon: 'cil-puzzle'
    },
    {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
    },
    {
        _name: 'CSidebarNavItem',
        name: 'KİDUGA',
        href: 'https://kiduga.com/',
        icon: { name: 'cil-browser', class: 'text-white' },
        _class: 'bg-success text-white',
        target: '_blank'
    }
    ]
}]