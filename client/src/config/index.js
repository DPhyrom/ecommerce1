export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home'
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shop/listing'
    },
    {
        id: 'women',
        label: 'women',
        path: '/shop/listing'
    },
    {
        id: 'kids',
        label: 'kids',
        path: '/shop/listing'
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shop/listing'
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shop/listing'
    },
]

export const categoryOptionsMap = {
    'men' : 'Men',
    'women' : 'Women',
    'kids' : 'Kids',
    'accessories' : 'Accessories',
    'footwear' : 'Footwear'
}

export const brandOptionsMap = {
    'nike' : 'Nike',
    'adidas' : 'Adidas',
    'puma' : 'Puma',
    'levi' : 'Levi',
    'zara' : 'Zara',
    'h&m' : 'H&M',
}

export const filterOptions ={
    category: [
        {id: "men", label: "Men"},
        {id: "women", label: "Women"},
        {id: "kids", label: "Kids"},
        {id: "accessories", label: "Accessories"},
        {id: "footwear", label: "Footwear"},
    ],
    brand : [
        {id: 'nike', label: "Nike"},
        {id: 'adidas', label: "Adidas"},
        {id: 'puma', label: "Puma"},
        {id: 'levi', label: "Levi"},
        {id: 'zara', label: "Zara"},
        {id: 'h&m', label: "H&M"},
    ]
}

export const sortOptions = [
    {id: "price-lowtohigh", label: "Price: Low to High"},
    {id: "price-hightolow", label: "Price: High to Low"},
    {id: "title-atoz", label: "Price: A to Z"},
    {id: "title-ztoa", label: "Price: Z to A"},
]
