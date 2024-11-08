export interface ISize {
    id: number;
    name: string;
    abbreviation: string;
    quantity: number;
    available: boolean;
  }
  
  export interface IImage {
    id: number;
    image_url: string;
  }
  
  export interface IProduct {
    id: number;
    title: string;
    description: string;
    price_new: number;
    price_old: number;
    quantity: number;
    available: boolean;
    categories: (string | null)[] | null; 
    subcategory: string | null; 
    color: string;
    sizes: ISize[];
    images: IImage[];
    thumbnail: string;
    color_id: number;
    subcategory_id: number | null;
    created_at: string;
    updated_at: string;
  }

export const products: IProduct[] = [
  {
      "id": 1,
      "title": "SUPER STRETCH TAPERED TAILORED TROUSER",
      "description": "Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.",
      "price_new": 20,
      "price_old": 25,
      "quantity": 11,
      "available": true,
      "categories": null,
      "subcategory": "trousers",
      "color": "beige",
      "sizes": [
          {
              "id": 1,
              "name": "xs",
              "abbreviation": "XS",
              "quantity": 5,
              "available": true
          },
          {
              "id": 2,
              "name": "s",
              "abbreviation": "S",
              "quantity": 1,
              "available": true
          },
          {
              "id": 3,
              "name": "m",
              "abbreviation": "M",
              "quantity": 0,
              "available": false
          },
          {
              "id": 4,
              "name": "l",
              "abbreviation": "L",
              "quantity": 3,
              "available": true
          },
          {
              "id": 5,
              "name": "xl",
              "abbreviation": "XL",
              "quantity": 2,
              "available": true
          },
          {
              "id": 6,
              "name": "xxl",
              "abbreviation": "XXL",
              "quantity": 0,
              "available": false
          }
      ],
      "images": [
          {
              "id": 1,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 2,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser"
          },
          {
              "id": 3,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser"
          },
          {
              "id": 4,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser"
          }
      ],
      "thumbnail": "https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser",
      "color_id": 1,
      "subcategory_id": 1,
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z"
  },
  {
      "id": 2,
      "title": "SUPER STRETCH TAPERED TAILORED TROUSER",
      "description": "Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.",
      "price_new": 20,
      "price_old": 25,
      "quantity": 15,
      "available": true,
      "categories": null,
      "subcategory": "trousers",
      "color": "blue",
      "sizes": [
          {
              "id": 1,
              "name": "xs",
              "abbreviation": "XS",
              "quantity": 2,
              "available": true
          },
          {
              "id": 2,
              "name": "s",
              "abbreviation": "S",
              "quantity": 3,
              "available": true
          },
          {
              "id": 3,
              "name": "m",
              "abbreviation": "M",
              "quantity": 10,
              "available": true
          },
          {
              "id": 4,
              "name": "l",
              "abbreviation": "L",
              "quantity": 0,
              "available": false
          },
          {
              "id": 5,
              "name": "xl",
              "abbreviation": "XL",
              "quantity": 0,
              "available": false
          },
          {
              "id": 6,
              "name": "xxl",
              "abbreviation": "XXL",
              "quantity": 0,
              "available": false
          }
      ],
      "images": [
          {
              "id": 5,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 6,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_1/female-navy-super-stretch-tapered-tailored-trouser"
          },
          {
              "id": 7,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_2/female-navy-super-stretch-tapered-tailored-trouser"
          },
          {
              "id": 8,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_3/female-navy-super-stretch-tapered-tailored-trouser"
          }
      ],
      "thumbnail": "https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_1/female-navy-super-stretch-tapered-tailored-trouser",
      "color_id": 2,
      "subcategory_id": 1,
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z"
  },
  {
      "id": 3,
      "title": "SUPER STRETCH TAPERED TAILORED TROUSER",
      "description": "Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.",
      "price_new": 20,
      "price_old": 25,
      "quantity": 12,
      "available": true,
      "categories": null,
      "subcategory": "trousers",
      "color": "black",
      "sizes": [
          {
              "id": 1,
              "name": "xs",
              "abbreviation": "XS",
              "quantity": 7,
              "available": true
          },
          {
              "id": 2,
              "name": "s",
              "abbreviation": "S",
              "quantity": 4,
              "available": true
          },
          {
              "id": 3,
              "name": "m",
              "abbreviation": "M",
              "quantity": 0,
              "available": false
          },
          {
              "id": 4,
              "name": "l",
              "abbreviation": "L",
              "quantity": 0,
              "available": false
          },
          {
              "id": 5,
              "name": "xl",
              "abbreviation": "XL",
              "quantity": 1,
              "available": true
          },
          {
              "id": 6,
              "name": "xxl",
              "abbreviation": "XXL",
              "quantity": 0,
              "available": false
          }
      ],
      "images": [
          {
              "id": 9,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_black_xl/female-black-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 10,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_black_xl_1/female-black-super-stretch-tapered-tailored-trouser"
          },
          {
              "id": 11,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_black_xl_2/female-black-super-stretch-tapered-tailored-trouser"
          },
          {
              "id": 12,
              "image_url": "https://media.boohoo.com/i/boohoo/fzz77463_black_xl_3/female-black-super-stretch-tapered-tailored-trouser"
          }
      ],
      "thumbnail": "https://media.boohoo.com/i/boohoo/fzz77463_black_xl_1/female-black-super-stretch-tapered-tailored-trouser",
      "color_id": 3,
      "subcategory_id": 1,
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z"
  },
  {
      "id": 4,
      "title": "BUTTON UP FESTIVAL MAC",
      "description": "Got a festival coming up? Practical, statement making, and perfect for dancing in, be prepared to take on whatever the weather decides to throw at you with our festival jackets. Get your rave on in a waterproof festival rain mac or bomber, or switch it up for a festival parka with a tassel trim, or a shredded denim jacket with floral embroidery.",
      "price_new": 19.8,
      "price_old": 22,
      "quantity": 20,
      "available": true,
      "categories": [
          "trends"
      ],
      "subcategory": "jackets",
      "color": "stone",
      "sizes": [
          {
              "id": 1,
              "name": "xs",
              "abbreviation": "XS",
              "quantity": 2,
              "available": true
          },
          {
              "id": 2,
              "name": "s",
              "abbreviation": "S",
              "quantity": 1,
              "available": true
          },
          {
              "id": 3,
              "name": "m",
              "abbreviation": "M",
              "quantity": 3,
              "available": true
          },
          {
              "id": 4,
              "name": "l",
              "abbreviation": "L",
              "quantity": 2,
              "available": true
          },
          {
              "id": 5,
              "name": "xl",
              "abbreviation": "XL",
              "quantity": 4,
              "available": true
          },
          {
              "id": 6,
              "name": "xxl",
              "abbreviation": "XXL",
              "quantity": 8,
              "available": true
          }
      ],
      "images": [
          {
              "id": 13,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz91994_stone_xl/female-stone-button-up-festival-mac-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 14,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz91994_stone_xl_1/female-stone-button-up-festival-mac-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 15,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz91994_stone_xl_2/female-stone-button-up-festival-mac-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 16,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz91994_stone_xl_3/female-stone-button-up-festival-mac-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          }
      ],
      "thumbnail": "https://media.boohoo.com/i/boohoo/gzz91994_stone_xl_1/female-stone-button-up-festival-mac-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit",
      "color_id": 4,
      "subcategory_id": 2,
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z"
  },
  {
      "id": 5,
      "title": "SHIRRED TRIANGLE BIKINI TOP",
      "description": "You`ll have all eyes on you this summer in this triangle bikini. Getting its name from the two triangle-shaped pieces of fabric that form each cup, this style is a classic silhouette that`s flattering for all sizes. Look on point in knot-tie triangle bikini tops or bring the heat in a mesh detail styles. This one would look fire with matching bottoms, fine gold jewellery, heeled wedges and an oversized beach bag. It`s poolside glam that you`ll never want to take off.",
      "price_new": 3,
      "price_old": 12,
      "quantity": 121,
      "available": true,
      "categories": [
          "summer",
          "trends"
      ],
      "subcategory": "bikinis",
      "color": "green",
      "sizes": [
          {
              "id": 1,
              "name": "xs",
              "abbreviation": "XS",
              "quantity": 17,
              "available": true
          },
          {
              "id": 2,
              "name": "s",
              "abbreviation": "S",
              "quantity": 19,
              "available": true
          },
          {
              "id": 3,
              "name": "m",
              "abbreviation": "M",
              "quantity": 45,
              "available": true
          },
          {
              "id": 4,
              "name": "l",
              "abbreviation": "L",
              "quantity": 20,
              "available": true
          },
          {
              "id": 5,
              "name": "xl",
              "abbreviation": "XL",
              "quantity": 11,
              "available": true
          },
          {
              "id": 6,
              "name": "xxl",
              "abbreviation": "XXL",
              "quantity": 9,
              "available": true
          }
      ],
      "images": [
          {
              "id": 17,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz02901_green_xl/female-green-shirred-triangle-bikini-top-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 18,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz02901_green_xl_1/female-shirred-triangle-bikini-top-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 19,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz02901_green_xl_2/female-shirred-triangle-bikini-top-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 20,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz02901_green_xl_3/female-shirred-triangle-bikini-top-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          }
      ],
      "thumbnail": "https://media.boohoo.com/i/boohoo/gzz02901_green_xl_1/female-shirred-triangle-bikini-top-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit",
      "color_id": 5,
      "subcategory_id": 3,
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z"
  },
  {
      "id": 6,
      "title": "3 PACK LEOPARD PAISLEY TIE BIKINI KIMONO SET",
      "description": "Protect your skin from the sun with this beach cover up from our latest beachwear collection. Designed to keep your skin out of the sun on those super hot beach days, our cover ups for the beach strike the perfect balance between practicality and style. Need style inspo? Team with a matching bikini and sandals for beach club plans. Golden hour awaits...just add a beach bag and sunglasses and you`re good to go!",
      "price_new": 33.5,
      "price_old": 35,
      "quantity": 15,
      "available": true,
      "categories": [
          "summer",
          "trends"
      ],
      "subcategory": "bikinis",
      "color": "pink",
      "sizes": [
          {
              "id": 1,
              "name": "xs",
              "abbreviation": "XS",
              "quantity": 3,
              "available": true
          },
          {
              "id": 2,
              "name": "s",
              "abbreviation": "S",
              "quantity": 2,
              "available": true
          },
          {
              "id": 3,
              "name": "m",
              "abbreviation": "M",
              "quantity": 0,
              "available": false
          },
          {
              "id": 4,
              "name": "l",
              "abbreviation": "L",
              "quantity": 0,
              "available": false
          },
          {
              "id": 5,
              "name": "xl",
              "abbreviation": "XL",
              "quantity": 1,
              "available": true
          },
          {
              "id": 6,
              "name": "xxl",
              "abbreviation": "XXL",
              "quantity": 9,
              "available": true
          }
      ],
      "images": [
          {
              "id": 21,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz19581_pink_xl/female-pink-3-pack-leopard-paisley-tie-bikini-kimono-set?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 22,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz19581_pink_xl_1/female-pink-3-pack-leopard-paisley-tie-bikini-kimono-set?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 23,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz19581_pink_xl_2/female-pink-3-pack-leopard-paisley-tie-bikini-kimono-set?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 24,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz19581_pink_xl_3/female-pink-3-pack-leopard-paisley-tie-bikini-kimono-set?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          }
      ],
      "thumbnail": "https://media.boohoo.com/i/boohoo/gzz19581_pink_xl_1/female-pink-3-pack-leopard-paisley-tie-bikini-kimono-set?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit",
      "color_id": 6,
      "subcategory_id": 3,
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z"
  },
  {
      "id": 7,
      "title": "DEEP V NECK MINI DRESS",
      "description": "Looking for the perfect casual dress to wear every day? This on-trend piece from our day dresses collection is just for you. A day dress is your go-to style for versatility and easy wearing, just pair it with trainers to achieve the perfect casual look. With its relaxed silhouette and floaty style, day dresses mean you stay comfortable all day, no matter what your plans.",
      "price_new": 25.2,
      "price_old": 28,
      "quantity": 9,
      "available": true,
      "categories": [
          "dresses",
          "summer",
          "trends"
      ],
      "subcategory": null,
      "color": "white",
      "sizes": [
          {
              "id": 1,
              "name": "xs",
              "abbreviation": "XS",
              "quantity": 0,
              "available": false
          },
          {
              "id": 2,
              "name": "s",
              "abbreviation": "S",
              "quantity": 2,
              "available": true
          },
          {
              "id": 3,
              "name": "m",
              "abbreviation": "M",
              "quantity": 1,
              "available": true
          },
          {
              "id": 4,
              "name": "l",
              "abbreviation": "L",
              "quantity": 5,
              "available": true
          },
          {
              "id": 5,
              "name": "xl",
              "abbreviation": "XL",
              "quantity": 0,
              "available": false
          },
          {
              "id": 6,
              "name": "xxl",
              "abbreviation": "XXL",
              "quantity": 1,
              "available": true
          }
      ],
      "images": [
          {
              "id": 25,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz97114_white_xl/female-white-deep-v-neck-mini-dress?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 26,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz97114_white_xl_1/female-white-deep-v-neck-mini-dress?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 27,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz97114_white_xl_2/female-white-deep-v-neck-mini-dress?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          },
          {
              "id": 28,
              "image_url": "https://media.boohoo.com/i/boohoo/gzz97114_white_xl_3/female-white-deep-v-neck-mini-dress?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
          }
      ],
      "thumbnail": "https://media.boohoo.com/i/boohoo/gzz97114_white_xl_1/female-white-deep-v-neck-mini-dress?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit",
      "color_id": 7,
      "subcategory_id": null,
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z"
  }
]