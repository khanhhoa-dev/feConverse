export interface IStore {
    id: number;
    name: string;
    address: string;
    image: string;
    phone?: string;
    mapLink: string;
}

export const stores: IStore[] = [
    {
        id: 1,
        name: 'CONVERSE NGUYEN TRAI D1',
        address: '124 Nguyen Trai, Ben Thanh Ward, District 1, Ho Chi Minh City',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_nguyen_trai_d1.png',
        phone: '+84 905 847 160',
        mapLink:
            'https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+Converse/@10.7696674,106.6909126,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMDcVsGIhl8pGj2fVx6_iFOYARfBqws8Wn5zt7w!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMDcVsGIhl8pGj2fVx6_iFOYARfBqws8Wn5zt7w%3Dw86-h114-k-no!7i1920!8i2560!4m7!3m6!1s0x31752f3db3eeffff:0xe7a68728f35f71e6!8m2!3d10.7698077!4d106.6908124!10e5!16s%2Fg%2F11h414jtpv?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 2,
        name: 'CONVERSE TAKASHIMAYA',
        address: 'L3 No 92-94 Nam Ky Khoi Nghia, Ben Nghe Ward, District 1, Ho Chi Minh City',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_takashimaya.png',
        mapLink:
            'https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+Converse/@10.7731644,106.7004506,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f1fadf2a0f9:0x9f0702957aebcb38!8m2!3d10.7731644!4d106.7004506!16s%2Fg%2F11tfdx40dx?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 3,
        name: 'CONVERSE CRESCENT MALL',
        address: 'L3 101 Ton Dat Tien, Tan Phu Ward, District 7, Ho Chi Minh City',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_crescent_mall.png',
        mapLink:
            'https://www.google.com/maps/place/C%E1%BB%ADa+H%C3%A0ng+Gi%C3%A0y+Converse/@10.7228204,106.7137322,17z/data=!3m1!4b1!4m6!3m5!1s0x31752ff2cdcbc9a3:0x7394609ba40ff350!8m2!3d10.7228204!4d106.7137322!16s%2Fg%2F11ft89ft98?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 4,
        name: 'CONVERSE HAI BÀ TRƯNG',
        address: '243 Hai Ba Trung, Vo Thi Sau Ward, District 3, Ho Chi Minh City',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_hai_ba_trung_2.jpg',
        mapLink:
            'https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+Converse/@10.7872129,106.6880199,17z/data=!4m10!1m2!2m1!1sconverse+243+Hai+Ba+Trung!3m6!1s0x31752f474356c3c3:0xf7dfccc0d2bbcecc!8m2!3d10.7872129!4d106.692526!15sChljb252ZXJzZSAyNDMgSGFpIEJhIFRydW5nIgOIAQFaGyIZY29udmVyc2UgMjQzIGhhaSBiYSB0cnVuZ5IBCnNob2Vfc3RvcmXgAQA!16s%2Fg%2F11t7lv4v56?entry=ttu',
    },
    {
        id: 5,
        name: 'CONVERSE AEON MALL BÌNH DƯƠNG',
        address:
            'No 01 Binh Duong Boulevard, Binh Giao Quarter, Thuan Giao Ward, Thuan An Town, Binh Duong Province',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_b_nh_d_ng_1.png',
        mapLink:
            'https://www.google.com/maps/place/Converse+Aeon+Mall+B%C3%ACnh+D%C6%B0%C6%A1ng/@10.933213,106.7088831,17z/data=!3m1!4b1!4m12!1m5!8m4!1e4!2s118086217228113579348!3m1!1e1!3m5!1s0x3174d7cb8260215d:0xe1d00f69b3473df8!8m2!3d10.933213!4d106.711458!16s%2Fg%2F11r2qwlrp7?entry=ttu&g_ep=EgoyMDI1MDQzMC4wIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 6,
        name: 'CONVERSE AEON MALL BÌNH TÂN',
        address:
            '1F-26 No 01, 17A Street, Binh Tri Dong B Ward, Binh Tan District, Ho Chi Minh City',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_aeon_mall_binh_tan_1.png',
        mapLink:
            'https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+Converse/@10.7427958,106.6119311,17z/data=!3m1!4b1!4m6!3m5!1s0x31752dc92f6641b7:0x20aa8fd1eb52d9fc!8m2!3d10.7427958!4d106.6119311!16s%2Fg%2F11c5hvhpy9?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 7,
        name: 'CONVERSE GOLD COAST NHA TRANG',
        address: 'Floor 2, GoldCoast Mall, 01 Tran Hung Dao, Loc Tho, Nha Trang, Khanh Hoa',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_gold_coast.jpg',
        mapLink:
            'https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+Converse/@12.2480102,109.1923,17z/data=!3m1!4b1!4m12!1m5!8m4!1e4!2s118086217228113579348!3m1!1e1!3m5!1s0x31706721a886dbaf:0xae917110348b2a5!8m2!3d12.2480102!4d109.1948749!16s%2Fg%2F11tfngvzht?entry=ttu&g_ep=EgoyMDI1MDQzMC4wIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 8,
        name: 'CONVERSE BA THÁNG HAI',
        address: '152 Ba Thang Hai ,Ward 12, District 10, Ho Chi Minh City',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_ba_thang_hai_1.jpg',
        mapLink:
            'https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+Converse/@10.7751936,106.6794992,17z/data=!3m1!4b1!4m6!3m5!1s0x31752fc798bf045b:0x1236765ad9f823d5!8m2!3d10.7751936!4d106.6794992!16s%2Fg%2F11h2293df_?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 9,
        name: 'CONVERSE QUANG TRUNG',
        address: '11 - 13 Quang Trung, Ward 10, Go Vap District, Ho Chi Minh City',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_quang_trung.jpg',
        mapLink:
            'https://www.google.com/maps/place/CONVERSE+Factory+Store/@10.8267126,106.6786475,17z/data=!3m1!4b1!4m6!3m5!1s0x317529c21023e447:0x8f088857fac37e2d!8m2!3d10.8267126!4d106.6786475!16s%2Fg%2F11ks1n43c2?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 10,
        name: 'CONVERSE LOTTE DEPARTMENT STORE',
        address: 'Floor 3 54 Lieu Giai Street, Ngoc Khanh Ward, Ba Dinh District, Ha Noi',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_lotte_department_2.jpg',
        mapLink:
            'https://www.google.com/maps/place/Converse+Store+-+Lotte+Department/@21.0318811,105.8097283,17z/data=!3m1!4b1!4m12!1m5!8m4!1e4!2s101054643176789162915!3m1!1e1!3m5!1s0x3135ab310adc38c7:0xdd233418047b49e9!8m2!3d21.0318761!4d105.8123032!16s%2Fg%2F11w90_4qq6?hl=id&entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D',
    },
    {
        id: 11,
        name: 'CONVERSE LOTTE MALL WEST LAKE HANOI',
        address: 'No 683 Lạc Long Quân, Phú Thượng, Tây Hồ, Hà Nội',
        image: 'https://www.converse.vn/media/magestore/storepickup/images/store/gallery/c/o/converse_west_lake.jpg',
        mapLink:
            'https://www.google.com/maps/place/Converse+Lotte+Mall+T%C3%A2y+H%E1%BB%93/@21.0760463,105.8117852,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab007cffde7f:0x79ff8762aa50321e!8m2!3d21.0760463!4d105.8117852!16s%2Fg%2F11wp04yc8_?hl=id&entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D',
    },
];
