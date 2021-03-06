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
                        name: 'Oyuncak D??zenleme',
                        component: Oyuncak
                    },
                    {
                        path: '/oyuncakislemleri/oyuncakduzenleen',
                        name: 'Oyuncak D??zenleme ??ngilizce',
                        component: Oyuncak
                    },
                    {
                        path: '/oyuncakislemleri/oyuncakphotos',
                        name: 'Oyuncak G??rselleri D??zenleme',
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
                        name: 'Masallar D??zenle',
                        component: Masal
                    },
                    {
                        path: '/masalislemleri/masallarduzenleen',
                        name: 'Masallar D??zenle ??ngilizce',
                        component: Masal
                    },
                    {
                        path: '/masalislemleri/masallarphotos',
                        name: 'Masal G??rselleri D??zenleme',
                        component: Masal
                    },
                    {
                        path: '/masalislemleri/masallarmp3',
                        name: 'Masal MP3 D??zenleme',
                        component: Masal
                    },
                ]
            },
            {
                path: '/blog',
                redirect: '/blog/blogislemleri',
                name: 'Blog ????lemleri',
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
                        name: 'Blog D??zenle',
                        component: Blog
                    },
                    {
                        path: '/blog/blogduzenleen',
                        name: 'Blog D??zenle ??ngilizce',
                        component: Blog
                    },
                    {
                        path: '/blog/blogphotos',
                        name: 'Blog G??rseller',
                        component: Blog
                    },
                ]
            },
            {
                path: '/tarif',
                redirect: '/tarif/tarifislemleri',
                name: 'Tarif ????lemleri',
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
                        name: 'Tarif D??zenle',
                        component: Tarif
                    },
                    {
                        path: '/tarif/tarifduzenleen',
                        name: 'Tarif D??zenle ??ngilizce',
                        component: Tarif
                    },
                    {
                        path: '/tarif/tarifphotos',
                        name: 'Tarif G??rseller',
                        component: Tarif
                    },
                ]
            },
            {
                path: '/blogkategori',
                redirect: '/blogkategori/blogkategoriislemleri',
                name: 'Blog Kategori ??slemleri',
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
                        name: 'Blog Kategori D??zenle',
                        component: BlogKategoriDuzenle
                    },
                ]
            },
            {
                path: '/muzikler',
                redirect: '/muzikler/muzikislemleri',
                name: 'M??zik ????lemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/muzikler/muzikislemleri',
                        component: MuzikIslemleri
                    },
                    {
                        path: '/muzikler/muzikekle',
                        name: 'M??zik Ekle',
                        component: MuzikEkle
                    },
                    {
                        path: '/muzikler/muzikduzenle',
                        name: 'M??zik D??zenle',
                        component: Muzikler
                    },
                    {
                        path: '/muzikler/muzikduzenleen',
                        name: 'M??zik D??zenle ??ngilizce',
                        component: Muzikler
                    },
                    {
                        path: '/muzikler/muzikphotos',
                        name: 'M??zik G??rseller',
                        component: Muzikler
                    },
                    {
                        path: '/muzikler/muzikmp3',
                        name: 'M??zik MP3',
                        component: Muzikler
                    },
                ]
            },
            {
                path: '/muzikkategori',
                redirect: '/muzikkategori/muzikkategoriislemleri',
                name: 'M??zik Kategori ????lemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/muzikkategori/muzikkategoriislemleri',
                        component: MuzikKategoriIslemleri
                    },
                    {
                        path: '/muzikkategori/muzikkategoriduzenle',
                        name: 'M??zik Kategori D??zenleme',
                        component: MuzikKategoriDuzenle
                    },
                    {
                        path: '/muzikkategori/muzikkategoriekle',
                        name: 'M??zik Kategori Eklemer',
                        component: MuzikKategoriEkle
                    },
                ]
            },
            {
                path: '/abebekgelisimi',
                redirect: '/abebekgelisimi/aylikbebekgelisimi',
                name: 'Ayl??k Bebek Geli??imi ????lemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/abebekgelisimi/aylikbebekgelisimi',
                        component: AylikBebekGelisimi
                    },
                    {
                        path: '/abebekgelisimi/aylikbebekgelisimiekle',
                        name: 'Ayl??k Bebek Geli??imi Ekleme',
                        component: AylikBebekGelisimiEkle
                    },
                    {
                        path: '/abebekgelisimi/aylikbebekgelisimiduzenle',
                        name: 'Ayl??k Bebek Geli??imi D??zenleme',
                        component: AylikBebek
                    },
                    {
                        path: '/abebekgelisimi/aylikbebekgelisimiduzenleen',
                        name: 'Ayl??k Bebek Geli??imi D??zenleme ??ngilizce',
                        component: AylikBebek
                    },
                    {
                        path: '/abebekgelisimi/aylikbebekgelisimiphotos',
                        name: 'Ayl??k Bebek Geli??imi G??rselleri D??zenleme',
                        component: AylikBebek
                    },
                ]
            },
            {
                path: '/hbebekgelisimi',
                redirect: '/hbebekgelisimi/haftalikbebekgelisimi',
                name: 'Haftal??k Bebek Geli??imi ????lemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/hbebekgelisimi/haftalikbebekgelisimi',
                        component: HaftalikBebekGelisimi
                    },
                    {
                        path: '/hbebekgelisimi/haftalikbebekphotos',
                        name: 'Haftal??k Bebek G??rseller',
                        component: HaftalikBebek
                    },
                    {
                        path: '/hbebekgelisimi/haftalikbebekduzenle',
                        name: 'Haftal??k Bebek D??zenle',
                        component: HaftalikBebek
                    },
                    {
                        path: '/hbebekgelisimi/haftalikbebekduzenleen',
                        name: 'Haftal??k Bebek D??zenle ??ngilizce',
                        component: HaftalikBebek
                    },
                    {
                        path: '/hbebekgelisimi/haftalikbebekgelisimiekle',
                        name: 'Haftal??k Bebek Geli??imi Ekleme',
                        component: HaftalikBebekGelisimiEkle
                    },
                ]
            },
            {
                path: '/yonetici',
                redirect: '/yonetici/yoneticiislemleri',
                name: 'Y??netici ????lemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/yonetici/yoneticiislemleri',
                        component: YoneticiIslemleri
                    },
                    {
                        path: '/yonetici/yoneticiduzenle',
                        name: 'Y??netici D??zenle',
                        component: YoneticiDuzenle
                    },
                    {
                        path: '/yonetici/yoneticiekle',
                        name: 'Y??netici Ekle',
                        component: YoneticiEkle
                    },
                ]
            },
            {
                path: '/kullanici',
                redirect: '/kullanici/kullaniciislemleri',
                name: 'Kullan??c?? ????lemleri',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: '/kullanici/kullaniciislemleri',
                        component: KullaniciIslemleri
                    },
                    {
                        path: '/kullanici/kullaniciduzenle',
                        name: 'Kullan??c?? D??zenle',
                        component: KullaniciDuzenle
                    },
                    {
                        path: '/kullanici/cocukislemleri',
                        name: '??ocuk ????lemleri',
                        component: CocukIslemleri
                    },
                    {
                        path: '/kullanici/cocukduzenle',
                        name: '??ocuk D??zenle',
                        component: CocukDuzenle
                    },
                    {
                        path: '/kullanici/cocukekle',
                        name: '??ocuk Ekle',
                        component: CocukEkle
                    }
                ]
            }, {
                path: '/keywords',
                name: 'Uygulama Genel Ayarlar??',
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