import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () =>
    import ('@/containers/TheContainer')

// Views
const AnaSayfa = () =>
    import ('@/views/Anasayfa')

const Oyuncak = () =>
    import ('@/views/Oyuncaklar/Oyuncak')
const Oyuncaklar = () =>
    import ('@/views/Oyuncaklar/Oyuncaklar')
const OyuncakEkle = () =>
    import ('@/views/Oyuncaklar/OyuncakEkle')

const Masal = () =>
    import ('@/views/Masallar/Masal')
const Masallar = () =>
    import ('@/views/Masallar/Masallar')
const MasallarEkle = () =>
    import ('@/views/Masallar/MasallarEkle')

const MuzikIslemleri = () =>
    import ('@/views/Muzikler/MuzikIslemleri')
const Muzikler = () =>
    import ('@/views/Muzikler/Muzikler')
const MuzikEkle = () =>
    import ('@/views/Muzikler/MuzikEkle')
const MuzikKategoriIslemleri = () =>
    import ('@/views/Muzikler/MuzikKategoriIslemleri')
const MuzikKategoriEkle = () =>
    import ('@/views/Muzikler/MuzikKategoriEkle')
const MuzikKategoriDuzenle = () =>
    import ('@/views/Muzikler/MuzikKategoriDuzenle')

const BlogIslemleri = () =>
    import ('@/views/Blog/BlogIslemleri')
const Blog = () =>
    import ('@/views/Blog/Blog')
const BlogEkle = () =>
    import ('@/views/Blog/BlogEkle')
const BlogKategoriIslemleri = () =>
    import ('@/views/Blog/BlogKategoriIslemleri')
const BlogKategoriEkle = () =>
    import ('@/views/Blog/BlogKategoriEkle')
const BlogKategoriDuzenle = () =>
    import ('@/views/Blog/BlogKategoriDuzenle')

    const TarifIslemleri = () =>
    import ('@/views/Tarif/TarifIslemleri')
const Tarif = () =>
    import ('@/views/Tarif/Tarif')
const TarifEkle = () =>
    import ('@/views/Tarif/TarifEkle')



const AylikBebek = () =>
    import ('@/views/AylikBebekGelisimi/AylikBebek')
const AylikBebekGelisimi = () =>
    import ('@/views/AylikBebekGelisimi/AylikBebekGelisimi')
const AylikBebekGelisimiEkle = () =>
    import ('@/views/AylikBebekGelisimi/AylikBebekGelisimiEkle')

const HaftalikBebek = () =>
    import ('@/views/HaftalikBebekGelisimi/HaftalikBebek')
const HaftalikBebekGelisimi = () =>
    import ('@/views/HaftalikBebekGelisimi/HaftalikBebekGelisimi')
const HaftalikBebekGelisimiEkle = () =>
    import ('@/views/HaftalikBebekGelisimi/HaftalikBebekGelisimiEkle')

const YoneticiIslemleri = () =>
    import ('@/views/YoneticiIslemleri/YoneticiIslemleri')
const YoneticiEkle = () =>
    import ('@/views/YoneticiIslemleri/YoneticiEkle')
const YoneticiDuzenle = () =>
    import ('@/views/YoneticiIslemleri/YoneticiDuzenle')

const KullaniciIslemleri = () =>
    import ('@/views/KullaniciIslemleri/KullaniciIslemleri')
const CocukIslemleri = () =>
    import ('@/views/KullaniciIslemleri/CocukIslemleri')
const KullaniciDuzenle = () =>
    import ('@/views/KullaniciIslemleri/KullaniciDuzenle')
const CocukDuzenle = () =>
    import ('@/views/KullaniciIslemleri/CocukDuzenle')
const CocukEkle = () =>
    import ('@/views/KullaniciIslemleri/CocukEkle')


const keyWords = () =>
    import ('@/views/KeyWords/keyWords')

// Views - Pages
const Page404 = () =>
    import ('@/views/pages/Page404')
const Page500 = () =>
    import ('@/views/pages/Page500')
const Login = () =>
    import ('@/views/pages/Login')
const Register = () =>
    import ('@/views/pages/Register')


Vue.use(Router)

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

function configRoutes() {
    return [{
        path: '/',
        redirect: '/anasayfa',
        name: 'Ana Sayfa',
        component: TheContainer,
        children: [{
                path: 'anasayfa',
                name: '',
                component: AnaSayfa
            },
            {
                path: '/oyuncakislemleri',
                redirect: '/oyuncakislemleri/oyuncaklar',
                name: 'Oyuncaklar',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/oyuncakislemleri/oyuncaklar',
                        component: Oyuncaklar
                    },
                    {
                        path: '/oyuncakislemleri/oyuncakekle',
                        name: 'Oyuncak Ekleme',
                        component: OyuncakEkle
                    },
                    {
                        path: '/oyuncakislemleri/oyuncakduzenle',
                        name: 'Oyuncak Düzenleme',
                        component: Oyuncak
                    },
                    {
                        path: '/oyuncakislemleri/oyuncakduzenleen',
                        name: 'Oyuncak Düzenleme İngilizce',
                        component: Oyuncak
                    },
                    {
                        path: '/oyuncakislemleri/oyuncakphotos',
                        name: 'Oyuncak Görselleri Düzenleme',
                        component: Oyuncak
                    },
                ]
            },
            {
                path: '/masalislemleri',
                redirect: '/masalislemleri/masallar',
                name: 'Masallar',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/masalislemleri/masallar',
                        component: Masallar
                    },
                    {
                        path: '/masalislemleri/masallarekle',
                        name: 'Masallar Ekle',
                        component: MasallarEkle
                    },
                    {
                        path: '/masalislemleri/masallarduzenle',
                        name: 'Masallar Düzenle',
                        component: Masal
                    },
                    {
                        path: '/masalislemleri/masallarduzenleen',
                        name: 'Masallar Düzenle İngilizce',
                        component: Masal
                    },
                    {
                        path: '/masalislemleri/masallarphotos',
                        name: 'Masal Görselleri Düzenleme',
                        component: Masal
                    },
                    {
                        path: '/masalislemleri/masallarmp3',
                        name: 'Masal MP3 Düzenleme',
                        component: Masal
                    },
                ]
            },
            {
                path: '/blog',
                redirect: '/blog/blogislemleri',
                name: 'Blog İşlemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/blog/blogislemleri',
                        component: BlogIslemleri
                    },
                    {
                        path: '/blog/blogekle',
                        name: 'Blog Ekle',
                        component: BlogEkle
                    },
                    {
                        path: '/blog/blogduzenle',
                        name: 'Blog Düzenle',
                        component: Blog
                    },
                    {
                        path: '/blog/blogduzenleen',
                        name: 'Blog Düzenle İngilizce',
                        component: Blog
                    },
                    {
                        path: '/blog/blogphotos',
                        name: 'Blog Görseller',
                        component: Blog
                    },
                ]
            },
            {
                path: '/tarif',
                redirect: '/tarif/tarifislemleri',
                name: 'Tarif İşlemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/tarif/tarifislemleri',
                        component: TarifIslemleri
                    },
                    {
                        path: '/tarif/tarifekle',
                        name: 'Tarif Ekle',
                        component: TarifEkle
                    },
                    {
                        path: '/tarif/tarifduzenle',
                        name: 'Tarif Düzenle',
                        component: Tarif
                    },
                    {
                        path: '/tarif/tarifduzenleen',
                        name: 'Tarif Düzenle İngilizce',
                        component: Tarif
                    },
                    {
                        path: '/tarif/tarifphotos',
                        name: 'Tarif Görseller',
                        component: Tarif
                    },
                ]
            },
            {
                path: '/blogkategori',
                redirect: '/blogkategori/blogkategoriislemleri',
                name: 'Blog Kategori İslemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/blogkategori/blogkategoriislemleri',
                        component: BlogKategoriIslemleri
                    },
                    {
                        path: '/blogkategori/blogkategoriekle',
                        name: 'Blog Kategori Ekle',
                        component: BlogKategoriEkle
                    },
                    {
                        path: '/blogkategori/blogkategoriduzenle',
                        name: 'Blog Kategori Düzenle',
                        component: BlogKategoriDuzenle
                    },
                ]
            },
            {
                path: '/muzikler',
                redirect: '/muzikler/muzikislemleri',
                name: 'Müzik İşlemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/muzikler/muzikislemleri',
                        component: MuzikIslemleri
                    },
                    {
                        path: '/muzikler/muzikekle',
                        name: 'Müzik Ekle',
                        component: MuzikEkle
                    },
                    {
                        path: '/muzikler/muzikduzenle',
                        name: 'Müzik Düzenle',
                        component: Muzikler
                    },
                    {
                        path: '/muzikler/muzikduzenleen',
                        name: 'Müzik Düzenle İngilizce',
                        component: Muzikler
                    },
                    {
                        path: '/muzikler/muzikphotos',
                        name: 'Müzik Görseller',
                        component: Muzikler
                    },
                    {
                        path: '/muzikler/muzikmp3',
                        name: 'Müzik MP3',
                        component: Muzikler
                    },
                ]
            },
            {
                path: '/muzikkategori',
                redirect: '/muzikkategori/muzikkategoriislemleri',
                name: 'Müzik Kategori İşlemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/muzikkategori/muzikkategoriislemleri',
                        component: MuzikKategoriIslemleri
                    },
                    {
                        path: '/muzikkategori/muzikkategoriduzenle',
                        name: 'Müzik Kategori Düzenleme',
                        component: MuzikKategoriDuzenle
                    },
                    {
                        path: '/muzikkategori/muzikkategoriekle',
                        name: 'Müzik Kategori Eklemer',
                        component: MuzikKategoriEkle
                    },
                ]
            },
            {
                path: '/abebekgelisimi',
                redirect: '/abebekgelisimi/aylikbebekgelisimi',
                name: 'Aylık Bebek Gelişimi İşlemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/abebekgelisimi/aylikbebekgelisimi',
                        component: AylikBebekGelisimi
                    },
                    {
                        path: '/abebekgelisimi/aylikbebekgelisimiekle',
                        name: 'Aylık Bebek Gelişimi Ekleme',
                        component: AylikBebekGelisimiEkle
                    },
                    {
                        path: '/abebekgelisimi/aylikbebekgelisimiduzenle',
                        name: 'Aylık Bebek Gelişimi Düzenleme',
                        component: AylikBebek
                    },
                    {
                        path: '/abebekgelisimi/aylikbebekgelisimiduzenleen',
                        name: 'Aylık Bebek Gelişimi Düzenleme İngilizce',
                        component: AylikBebek
                    },
                    {
                        path: '/abebekgelisimi/aylikbebekgelisimiphotos',
                        name: 'Aylık Bebek Gelişimi Görselleri Düzenleme',
                        component: AylikBebek
                    },
                ]
            },
            {
                path: '/hbebekgelisimi',
                redirect: '/hbebekgelisimi/haftalikbebekgelisimi',
                name: 'Haftalık Bebek Gelişimi İşlemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/hbebekgelisimi/haftalikbebekgelisimi',
                        component: HaftalikBebekGelisimi
                    },
                    {
                        path: '/hbebekgelisimi/haftalikbebekphotos',
                        name: 'Haftalık Bebek Görseller',
                        component: HaftalikBebek
                    },
                    {
                        path: '/hbebekgelisimi/haftalikbebekduzenle',
                        name: 'Haftalık Bebek Düzenle',
                        component: HaftalikBebek
                    },
                    {
                        path: '/hbebekgelisimi/haftalikbebekduzenleen',
                        name: 'Haftalık Bebek Düzenle İngilizce',
                        component: HaftalikBebek
                    },
                    {
                        path: '/hbebekgelisimi/haftalikbebekgelisimiekle',
                        name: 'Haftalık Bebek Gelişimi Ekleme',
                        component: HaftalikBebekGelisimiEkle
                    },
                ]
            },
            {
                path: '/yonetici',
                redirect: '/yonetici/yoneticiislemleri',
                name: 'Yönetici İşlemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/yonetici/yoneticiislemleri',
                        component: YoneticiIslemleri
                    },
                    {
                        path: '/yonetici/yoneticiduzenle',
                        name: 'Yönetici Düzenle',
                        component: YoneticiDuzenle
                    },
                    {
                        path: '/yonetici/yoneticiekle',
                        name: 'Yönetici Ekle',
                        component: YoneticiEkle
                    },
                ]
            },
            {
                path: '/kullanici',
                redirect: '/kullanici/kullaniciislemleri',
                name: 'Kullanıcı İşlemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/kullanici/kullaniciislemleri',
                        component: KullaniciIslemleri
                    },
                    {
                        path: '/kullanici/kullaniciduzenle',
                        name: 'Kullanıcı Düzenle',
                        component: KullaniciDuzenle
                    },
                    {
                        path: '/kullanici/cocukislemleri',
                        name: 'Çocuk İşlemleri',
                        component: CocukIslemleri
                    },
                    {
                        path: '/kullanici/cocukduzenle',
                        name: 'Çocuk Düzenle',
                        component: CocukDuzenle
                    },
                    {
                        path: '/kullanici/cocukekle',
                        name: 'Çocuk Ekle',
                        component: CocukEkle
                    }
                ]
            }, {
                path: '/keywords',
                name: 'Uygulama Genel Ayarları',
                component: keyWords
            }
        ]
    }, {
        path: '/pages',
        redirect: '/pages/404',
        name: 'Pages',
        component: {
            render(c) { return c('router-view') }
        },
        children: [{
                path: '404',
                name: 'Page404',
                component: Page404
            },
            {
                path: '500',
                name: 'Page500',
                component: Page500
            },
            {
                path: 'login',
                name: 'Login',
                component: Login
            },
            {
                path: 'register',
                name: 'Register',
                component: Register
            }
        ]
    }]
}