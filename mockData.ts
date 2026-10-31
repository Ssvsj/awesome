import { BaseOption, DishItem, ProteinOption, SauceOption, AddonOption, SquadPackItem } from '../types';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuADWi1H1iv3Y3g0Bieyl6GIClWMVDZq-kUeR_SODUD8-qGW1S_NLV1C4TV_vKNxGYKS-kXFAa5noHRpBld6yrr5NGE0C6bBwGQworW-FUEQD6msWAELbRuRnRqIinyo9PUfhF4X3u4HLjOJ1sxrvYSetswcp3vunWy-sQ8rAQva5zbw0FmdpvEj7XoFcUkx__dWJ5MWsaJ6s5Jv_yTaB_jAx5PUqRQX2QjC19WNhY5d4Cne3t8TTvvu';
export const AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDktvGcDDkl1OEIOZL6gNbVfFmZLWpEhnXyhiKRbsiyn8cqix0EbCoUi7z6tuY4oG-_VPxO1LiaLTUyYQVU7T5IMsh2_17roDzuHhX6-kxtpELW8D0gUht5npdeUZ9h602oksX9_tlO7py4O0-PHr2-ln4r8BmclFXrhyoW_n-5dLWlFLBf7zLehDQu0jkDirTqbmxSDBoKvexxkZlV7LCY7mHUEUNdB3TmVOFO_zbDiuDmkgAFbyqY';

export const HERO_SECRET_DROP = {
  id: 'secret-drop-hero',
  title: 'Butter Chicken Tom Yum Bao',
  price: 12.00,
  dropsLeft: 400,
  collab: 'Chef Raj x Somchai Collab',
  heatLevelText: 'Level 4: Bangkok Scorcher',
  heatStars: 4,
  desc: '48hr marinated tandoori chicken, hot kaffir-lime makhani glaze, shallot crunch & Thai basil in a pillowy charcoal bao.',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnLAVpgj4etlPoK5LMdFDxrBbRDQq2fiqDY6qBUhOcbHbKhvciqakKGAmn3IYZWqy24wvRrThvcdaFC91_XcBXU8iGHNUmqT-9h1s5ZDUgfGQgxGThBkje26PEIyO0L2bZSU1aFJXl5zScqn12H1z_B3A1L7o6CWxbiw55w6kdIRzzDQwteRDlZtEx43Kh2z2Afac29Nq8n4AQwVDoF5KRar4nJjypa7vnjk8h7NPlmdWmXCIXuaQ7',
  alt: 'Close-up cinematic street food photo of fluffy steamed bao buns bursting with rich creamy Indian butter chicken infused with fragrant Thai tom yum aromatics'
};

export const VIRAL_MASHUPS = [
  {
    id: 'mashup-1',
    title: 'Tom Yum Golgappe',
    price: 9.00,
    tag: 'Viral',
    desc: 'Crisp semolina puris loaded with spiced chickpea-sprout stuffing & drenched in chilled fiery tom yum broth.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKZ4ksMvDy1vt6Xwc67SLe4VGB_e69wbJmueUeewx_4FzAhXeewsx_XmtmiOyBRjxkYZ3oDAv1C79LkYuVFM2J1EVK41g-2myeihc_qjKcWi9Q4V6YeB8dwNl8TseQpp3jVnedP4GT9z2LROHFhL2oB0i2r7CnEcL5llN43ZVqV8s6KWwkgJwWM_fkBJKSQKJA3WhA7vNtAKDCFdTp0fXxz41yolUVoa86Xar2ghosobyi3g-4igip'
  },
  {
    id: 'mashup-2',
    title: 'Thai Basil Paneer Burger',
    fullTitle: 'Thai Basil Paneer Smash Burger',
    price: 14.00,
    tag: 'Trending',
    desc: 'Smashed spiced paneer cutlet, sweet spicy holy basil glaze, pickled red onion, kewpie masala mayo on brioche.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChGieJuldSzh-5yuTBPu9e-MaoqR-NkhSsRIVqU6luJuQfsF-Vxd0L0Ax3LlOR_0bNTuqe7t13jtPKuNtI1TvvKPycbpwA90quuDxR3QKln8jawEQEC-IekcgGgjG49_L2Sqsp2Md2XWmwoGsP-kIkptNzxZc7ma3uur6cpm5-OCZ0xdsIug1wHI3VWUd1SI-C-MhvT98hyUzUoZiQaRxIvzUALzNANmSvwcCsWgCYhQkZKemNUp9p'
  },
  {
    id: 'mashup-3',
    title: 'Massaman Lamb Biryani',
    fullTitle: 'Massaman Lamb Shank Biryani',
    price: 24.00,
    tag: 'Chef Pick',
    desc: 'Fall-off-the-bone lamb shank slow-braised in southern Thai massaman curry paste, layered with saffron dum basmati rice.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqvJ7Keed3eSGq8m7LxTVfE4AxaTUdu-7JJpYe1-vbhD5WrM-A2m22we3PLVdl7qlKX9JhRPrjNzuJ2ey3N3vgcEIJqXropKfluUbRIK5GAGUN-CuFJS1Md-xT1_HW8Ew78aqCcyNjsCCIzDFDny0EKWEiQd879bVoWaprTDsIQ4-mTriIAwxD-T4Gj4Uh1_ZMi3Rg7bld3rzMBNMlqDSTOuUMgEjSjeRwYU6VBVXtzog15zJo9KO'
  },
  {
    id: 'mashup-4',
    title: 'Mango Sticky Kulfi',
    price: 8.00,
    tag: 'Sweet',
    desc: 'Cardamom condensed milk kulfi dipped in Alphonso mango puree and sticky sweet coconut rice crispies.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL-aGCJlskjnmII2oji2fvadpXw2nBy5KwJydisDZeb9OLsXhiNNay42kAyZv7wOAFdf7V1hWrzWPwT4xrdIGY_yx7bKJ3qH6hUSwNjJ7TfWVFJ26fzNqZI3Qqk47nK5IqbLYQG5wLqPEA-rgv2deN4G3qN3QgiSqV2TwLNSu8AY4erkMMuR2jvDX1wiqU50qghw5jla0qrOSPNYgHjmhI6pwi7qXjdCS-MVeuwGEhAyFurpv38AxY'
  }
];

export const SQUAD_PACKS: SquadPackItem[] = [
  {
    id: 'squad-1',
    title: 'Late Night Munchies Box',
    price: 28.00,
    originalPrice: 37.00,
    badge: 'Best for 2-3',
    savings: 'Save $9',
    desc: 'The ultimate Indo-Thai 1:00 AM antidote. Loaded with carbs, crunch, and soul-restoring fire.',
    items: [
      { icon: 'lunch_dining', name: '2x Tom Yum Bao' },
      { icon: 'ramen_dining', name: '1x Pad Thai Chaat Fries' },
      { icon: 'water_drop', name: '2x Lemongrass Thums Up' }
    ],
    readyIn: 'Ready in 15 mins'
  },
  {
    id: 'squad-2',
    title: 'Bollywood to Bangkok Date Drop',
    price: 36.00,
    originalPrice: 46.00,
    badge: 'Date Night Hit',
    savings: 'High Romance',
    desc: 'A sensory rollercoaster built for two. Sweet, sour, smoky heat, finished with coconut indulgence.',
    items: [
      { icon: 'skillet', name: 'Massaman Biryani Bowl' },
      { icon: 'local_drink', name: '6x Tom Yum Pani Puris' },
      { icon: 'icecream', name: '2x Mango Sticky Kulfis' }
    ],
    readyIn: 'Ready in 20 mins'
  }
];

export const MENU_DISHES: DishItem[] = [
  {
    id: 'menu-item-1',
    title: 'Tom Yum Pani Puri Shots (6 pcs)',
    price: 11.50,
    desc: 'Tangy lemony lemongrass broth infused with tamarind mint water, spiced potato chickpeas, crispy golden puris ready for immediate pouring.',
    heatScore: 'HEAT 3/4',
    heatLevel: 3,
    prepTime: '5-8 min',
    calories: '280 kcal',
    dietTags: ['Shellfish broth or Tamarind Veg', 'DIY Pour Tray Included'],
    promoTag: '🔥 TikTok Viral',
    isVegan: true,
    category: 'mashup',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBedxdwLyfOFuT4rhrnh2fRWevlxdnq4OmwjN6P8Glnm7Zgbk_IgJtskmcFPhKyluSxKPgNPLh2k5OusKvrjt71Wd-hPgcHOaR2cgwJCVHKuRbg1kT7ga30MLY9u-BnCaFGUt9sX-CKH1UaQ8cHSMUvTyzQB3Yn3mQB4Pv0gnyzasRN7xdDYrIm4FLKFR4Ov5HdHtdC_uvRFn0xKGw3Ldx7XIjlLSWNv2kVN-fwWfn5CXY4XTZmbO1l',
    altText: 'Close up street food photography of 6 crispy hollow pani puris nestled on shot glasses filled with vivid red-orange spicy Tom Yum broth'
  },
  {
    id: 'menu-item-2',
    title: 'Butter Chicken Bao Sliders (3 pcs)',
    price: 14.00,
    desc: 'Fluffy steamed lotus bao, 12-hr smoked tandoori chicken, creamy makhani glaze, pickled Thai birds-eye chilies, fresh cilantro burst.',
    heatScore: 'HEAT 2/4',
    heatLevel: 2,
    prepTime: '10-12 min',
    calories: '520 kcal',
    dietTags: ['Contains Dairy & Gluten', 'Extra Makhani Dip +$1.50'],
    promoTag: '⭐ Chef Favorite',
    isHalal: true,
    category: 'baos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_kvImSrrrqb7EJq-VQciAkfbfREDyD99pzimRwnVN-hbnozfueTrj6KoUuP02NRT6QZEdEFL2HLoCD80nSnA2RNieX_yHyhe1KMB6bh4aalnCSmmTeoAbTjaGBDQ1QzG-0gvmcw-GKolYN-lGlmyiuP-oMdtTSNX6u_Ef_ZJRXC3hsvSLPadKNtjIxTeJYMwZT-16Agues2_r5T5nLBgr_LBUwRYlz0E3tt24HD7SDut5zfa9xl_X',
    altText: 'Three pillowy white lotus leaf steamed bao buns stuffed with char-grilled smoky red tandoori chicken chunks smothered in creamy velvet orange makhani sauce'
  },
  {
    id: 'menu-item-3',
    title: 'Pad Thai Biryani Skillet',
    price: 16.50,
    desc: 'Wok-tossed rice noodles with aged basmati, crispy shallots, crushed peanuts, tamarind chili masala, choice of paneer or tandoor chicken.',
    heatScore: 'HEAT 3/4',
    heatLevel: 3,
    prepTime: '14-16 min',
    calories: '680 kcal',
    dietTags: ['Peanuts & Soy', 'Feeds 1-2 Hunger Level'],
    promoTag: '💥 Heavy Hitter',
    category: 'noodles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaVaQwH1hFGK9jFFdu6I2IXcfsWoJplHU013eW4shvUXTMDwLAsh3WGgWj-p_Yx1WPg8MJBWyIBEE8LmePIjmCGE1MNJjvSm3rh7fnVwMG2bG0Ep5MbP3almjQdYHT96i3m-Dij2P8PNjeLet53CeuBuixtIZ84iNt-IQU9bd2rHjY-UlBxhrTQJbqUdMKqpyhskXtHlDaNM7DJOMs0FTls4-c2hAPNvJZMfQUf-XpUtnvxQA8efIB',
    altText: 'A sizzling cast iron wok skillet showing flat rice noodles tangled with fragrant saffron basmati rice, charred golden paneer cubes, roasted crushed peanuts'
  },
  {
    id: 'menu-item-4',
    title: 'Gunpowder Crispy Calamari',
    price: 13.00,
    desc: 'South Indian roasted gunpowder lentil-chili crust, crispy aromatic curry leaves, served with house Thai sweet sriracha mayo.',
    heatScore: 'HEAT 2/4',
    heatLevel: 2,
    prepTime: '7-9 min',
    calories: '410 kcal',
    dietTags: ['Seafood', 'Bar Snack Essential'],
    promoTag: 'Crispy Munch',
    category: 'mashup',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPE_-PF8HqGHkFgvrrEVZpsHMfr1ckQLzgHGmO7PcamjaO5XWkVg3lfLIbZE1l1-0pNgAYSaZIdoYaBWoV8QvRiIwLf3UfnG-_QSxuvyuQ6FzjDiFgi_SDTiB7O6I98MqkYwit4kC3WVOwf7GpyICbWLi95OQ92TPOQXks6G1KdsCZVtZxDE0QJcoM05xeX3ND5W_Nqmn4BXTQq0JQVQPXHFA-EL5WY8f5baSV4HVFZh4OE74QJ_yY',
    altText: 'Golden crisp deep fried calamari rings tossed in vivid crimson gunpowder podi spices and crispy curry leaves'
  }
];

export const CUSTOM_BASES: BaseOption[] = [
  {
    id: 'base-roti',
    name: 'Garlic Butter Roti Roll',
    desc: 'Flaky, charred layered flatbread',
    price: 0.00,
    icon: 'bakery_dining'
  },
  {
    id: 'base-padkeemao',
    name: 'Pad Keemao Flat Noodles',
    desc: 'Wok-tossed drunken street ribbons',
    price: 0.00,
    chefPick: true,
    icon: 'ramen_dining'
  },
  {
    id: 'base-coconut-rice',
    name: 'Fragrant Coconut Basmati Rice',
    desc: 'Infused with kaffir lime & cardamon',
    price: 0.00,
    icon: 'rice_bowl'
  },
  {
    id: 'base-cauliflower',
    name: 'Charred Cauliflower Rice',
    desc: 'Keto-friendly roasted florets',
    price: 1.50,
    icon: 'nutrition'
  }
];

export const CUSTOM_PROTEINS: ProteinOption[] = [
  {
    id: 'protein-chicken',
    name: 'Tandoori Smoked Chicken',
    desc: 'Included',
    price: 0.00,
    tag: 'Popular'
  },
  {
    id: 'protein-tofu',
    name: 'Crispy Chili Garlic Tofu',
    desc: 'Included',
    price: 0.00,
    tag: 'Vegan (V)'
  },
  {
    id: 'protein-shrimp',
    name: 'Thai Lemongrass Shrimp',
    desc: '+ $3.00',
    price: 3.00,
    tag: 'Fresh'
  },
  {
    id: 'protein-lamb',
    name: 'Smashed Wagyu Lamb',
    desc: '+ $4.00',
    price: 4.00,
    tag: 'Premium'
  }
];

export const CUSTOM_SAUCES: SauceOption[] = [
  {
    id: 'sauce-makhani',
    name: 'Creamy Makhani Butter Masala',
    desc: 'Velvety tomato cream, fenugreek, cashew honey',
    colorHex: '#fea100'
  },
  {
    id: 'sauce-greencurry',
    name: 'Green Curry Coconut Lemongrass',
    desc: 'Bangkok green chilies, thai sweet basil, coconut milk',
    colorHex: '#c3f400'
  },
  {
    id: 'sauce-vindaloo',
    name: 'Fiery Vindaloo Tamarind',
    desc: 'Goan sharp palm vinegar, toasted cloves, sour tamarind',
    colorHex: '#ff535a'
  },
  {
    id: 'sauce-satay',
    name: 'Spicy Peanut Satay Masala',
    desc: 'Roasted crushed peanuts, cumin, ginger, galangal',
    colorHex: '#ffc787'
  }
];

export const HEAT_LEVELS = [
  {
    level: 1,
    name: 'Cool Lassi (Tier 1)',
    shortName: '1. Cool Lassi',
    quote: 'Gentle coconut cream, sweet basil, zero chili burn. Smooth sailing.'
  },
  {
    level: 2,
    name: 'Delhi Warmth (Tier 2)',
    shortName: '2. Delhi Warmth',
    quote: 'Mild Kashmiri chili flush. Warming spices without intense heat.'
  },
  {
    level: 3,
    name: 'Bombay Fiery (Tier 3)',
    shortName: '3. Bombay Heat',
    quote: 'Fresh sliced birds-eye chilies + roasted habanero. Authentic street punch!'
  },
  {
    level: 4,
    name: 'Bangkok Dragon (Tier 4)',
    shortName: '4. Bangkok Dragon',
    quote: 'Sweat-inducing raw Thai bird chilies + ghost pepper oil glaze.'
  },
  {
    level: 5,
    name: 'Face Melter (Tier 5)',
    shortName: '5. Face Melter 🌶️',
    quote: '100% Carolina Reaper paste drop. Milk not included. Order at your own peril!'
  }
];

export const CUSTOM_ADDONS: AddonOption[] = [
  {
    id: 'addon-papadum',
    name: 'Crushed Papadum Chips',
    desc: 'Lentil street crisps sprinkled for texture',
    price: 0.00
  },
  {
    id: 'addon-chillies',
    name: 'Pickled Birds-Eye Chilies',
    desc: 'Sour lime soaked raw thai peppers',
    price: 0.00
  },
  {
    id: 'addon-garlic',
    name: 'Crispy Garlic Crunch',
    desc: 'Golden caramelized toasted garlic crisps',
    price: 0.00
  },
  {
    id: 'addon-cheese',
    name: 'Oozing Smoked Amul Cheese',
    desc: 'Melted iconic Mumbai street processed cheese',
    price: 2.00
  }
];
