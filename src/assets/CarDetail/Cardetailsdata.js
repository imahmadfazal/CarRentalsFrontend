import collectionsData from "../OurCollection/Collectionsdata";

/**
 * carDetailsData.js
 * ------------------
 * Per-car MEDIA (video + image gallery) for the Car Details page.
 *
 * REPLACE THESE PATHS WITH YOUR OWN FILES.
 * Media paths are generated automatically below, one folder per car,
 * named after each car's `id` from collectionsData.js (e.g.
 * "porsche-911-gt3"). Drop your files into /public to match:
 *
 *   public/
 *     videos/
 *       porsche-911-gt3/main.mp4
 *     images/
 *       porsche-911-gt3/poster.jpg   (optional — video thumbnail/paused frame)
 *       porsche-911-gt3/1.jpg ... 7.jpg
 *
 * Since this is generated from collectionsData.js, every car (all 18,
 * across sports/luxury/suv) automatically gets a matching media entry
 * with the same id — add a 19th car there and it works here too, no
 * change needed in this file. If your real folder names don't match
 * a car's id exactly, just edit IMAGE_COUNT below or hand-edit a
 * specific entry in the generated object before it's exported.
 */

const IMAGE_COUNT = 7; // how many numbered images (1.jpg ... 7.jpg) per car

const videoMap = {
    "porsche-911-gt3": "/videos/sports category videos/porsche-911-gt3.mp4",
    "ferrari-488-gtb": "/videos/sports category videos/ferrari-488-gtb.mp4",
    "lamborghini-huracan": "/videos/sports category videos/lamborghini-huracan.mp4",
    "mercedes-amg-gt": "/videos/sports category videos/mercedes-amg-gt.mp4",
    "bmw-m4-competition": "/videos/sports category videos/bmw.mp4",
    "audi-r8": "/videos/sports category videos/audi-r8.mp4",
    "mercedes-s-class": "/videos/luxury cayegory videos/mersedese_S_class.mp4",
    "bmw-7-series": "/videos/luxury cayegory videos/bmwi7.mp4",
    "audi-q8": "/videos/luxury cayegory videos/audi_q8.mp4",
    "Toyota_Crown_rs": "/videos/luxury cayegory videos/crown.mp4",
    "bentley-flying-spur": "/videos/luxury cayegory videos/bently.mp4",
    "sonata_n_Line": "/videos/luxury cayegory videos/sonata.mp4",
    "range-rover-sport": "/videos/SUVs category videos/rangerover.mp4",
    "lexus_lx": "/videos/SUVs category videos/lexus.mp4",
    "prado": "/videos/SUVs category videos/prado.mp4",
    "toyota_fortuner": "/videos/SUVs category videos/fortuner.mp4",
    "urus": "/videos/SUVs category videos/urus-showcase.mp4",
    "toyota-land-cruiser": "/videos/SUVs category videos/landcruiserv8.mp4",
};

const folderKeyMap = {
    "porsche-911-gt3": "porsche-911-turbo",
    "ferrari-488-gtb": "ferrari-roma",
    "lamborghini-huracan": "lamborghini-huracan",
    "mercedes-amg-gt": "mercedes-amg-gt",
    "bmw-m4-competition": "bmw-m4-competition",
    "audi-r8": "audi-r8",
    "mercedes-s-class": "Mercedese_S_class",
    "bmw-7-series": "bmw_i7",
    "audi-q8": "audi_q8",
    "Toyota_Crown_rs": "crown",
    "bentley-flying-spur": "bently",
    "sonata_n_Line": "sonata_Nline",
    "range-rover-sport": "range_rover",
    "lexus_lx": "lexus",
    "prado": "prado",
    "toyota_fortuner": "fortuner",
    "urus": "urus",
    "toyota-land-cruiser": "landcruiser_V8",
};

const scannedImages = {
  "audi_q8": [
    "/collections/Luxury catagory/audi_q8/Audi (1).jpg",
    "/collections/Luxury catagory/audi_q8/Audi (2).jpg",
    "/collections/Luxury catagory/audi_q8/Audi RS Q8 _ 2025MY Performance (Color_ Chilli Red Metallic) _ Side.jpg",
    "/collections/Luxury catagory/audi_q8/Audi.jpg",
    "/collections/Luxury catagory/audi_q8/download (6).jpg",
    "/collections/Luxury catagory/audi_q8/download (7).jpg",
    "/collections/Luxury catagory/audi_q8/download (8).jpg"
  ],
  "bently": [
    "/collections/Luxury catagory/bently/download (1).jpg",
    "/collections/Luxury catagory/bently/download (2).jpg",
    "/collections/Luxury catagory/bently/download (3).jpg",
    "/collections/Luxury catagory/bently/download (4).jpg",
    "/collections/Luxury catagory/bently/download (5).jpg",
    "/collections/Luxury catagory/bently/Pinterest » @Aboodi_nixon ⋆.jpg"
  ],
  "bmw_i7": [
    "/collections/Luxury catagory/bmw_i7/BMW (1).jpg",
    "/collections/Luxury catagory/bmw_i7/BMW.jpg",
    "/collections/Luxury catagory/bmw_i7/download (1).jpg",
    "/collections/Luxury catagory/bmw_i7/download (2).jpg",
    "/collections/Luxury catagory/bmw_i7/New BMW 7 Series Strikes A Pose With Matte Silver___.jpg"
  ],
  "crown": [
    "/collections/Luxury catagory/crown/crown1.jpg",
    "/collections/Luxury catagory/crown/Toyota Crown Hybrid Royal Saloon (S210) 2012.jpg",
    "/collections/Luxury catagory/crown/TOYOTA CROWN 🔥.jpg",
    "/collections/Luxury catagory/crown/TOYOTA CROWN 🤍✨.jpg",
    "/collections/Luxury catagory/crown/クラウン × 極上の休日 ⑤.jpg"
  ],
  "Mercedese_S_class": [
    "/collections/Luxury catagory/Mercedese_S_class/Brabus Black Edition_ Mercedes-Benz Interior Mastery.jpg",
    "/collections/Luxury catagory/Mercedese_S_class/download (1).jpg",
    "/collections/Luxury catagory/Mercedese_S_class/download (2).jpg",
    "/collections/Luxury catagory/Mercedese_S_class/Maybach.jpg",
    "/collections/Luxury catagory/Mercedese_S_class/Mercedes Love.jpg",
    "/collections/Luxury catagory/Mercedese_S_class/Two Tone Maybach.jpg"
  ],
  "sonata_Nline": [
    "/collections/Luxury catagory/sonata_Nline/Best Hyundai Car Photos.jpg",
    "/collections/Luxury catagory/sonata_Nline/download (6).jpg",
    "/collections/Luxury catagory/sonata_Nline/Hyundai Sonata dn8.jpg",
    "/collections/Luxury catagory/sonata_Nline/Hyundai Sonata n-line_.jpg",
    "/collections/Luxury catagory/sonata_Nline/Killer bae.jpg",
    "/collections/Luxury catagory/sonata_Nline/Sonata Pov Interior.jpg"
  ],
  "audi-r8": [
    "/collections/sports car catagory/audi-r8/audi1.jpg",
    "/collections/sports car catagory/audi-r8/audi2.jpg",
    "/collections/sports car catagory/audi-r8/audi3.jpg",
    "/collections/sports car catagory/audi-r8/audi4.jpg",
    "/collections/sports car catagory/audi-r8/audi5.jpg",
    "/collections/sports car catagory/audi-r8/audi6.jpg",
    "/collections/sports car catagory/audi-r8/audi7.jpg"
  ],
  "bmw-m4-competition": [
    "/collections/sports car catagory/bmw-m4-competition/bmw1.jpg",
    "/collections/sports car catagory/bmw-m4-competition/bmw2.jpg",
    "/collections/sports car catagory/bmw-m4-competition/bmw3.jpg",
    "/collections/sports car catagory/bmw-m4-competition/bmw4.jpg",
    "/collections/sports car catagory/bmw-m4-competition/bmw5.jpg",
    "/collections/sports car catagory/bmw-m4-competition/bmw6.jpg",
    "/collections/sports car catagory/bmw-m4-competition/bmw7.jpg"
  ],
  "ferrari-roma": [
    "/collections/sports car catagory/ferrari-roma/ferrari1.jpg",
    "/collections/sports car catagory/ferrari-roma/ferrari2.jpg",
    "/collections/sports car catagory/ferrari-roma/ferrari3.jpg",
    "/collections/sports car catagory/ferrari-roma/ferrari4.jpg",
    "/collections/sports car catagory/ferrari-roma/ferrari5.jpg",
    "/collections/sports car catagory/ferrari-roma/ferrari6.jpg"
  ],
  "lamborghini-huracan": [
    "/collections/sports car catagory/lamborghini-huracan/lamborghini1.jpg",
    "/collections/sports car catagory/lamborghini-huracan/lamborghini2.jpg",
    "/collections/sports car catagory/lamborghini-huracan/lamborghini3.jpg",
    "/collections/sports car catagory/lamborghini-huracan/lamborghini4.jpg",
    "/collections/sports car catagory/lamborghini-huracan/lamborghini5.jpg"
  ],
  "mercedes-amg-gt": [
    "/collections/sports car catagory/mercedes-amg-gt/mercedes1.jpg",
    "/collections/sports car catagory/mercedes-amg-gt/mercedes2.jpg",
    "/collections/sports car catagory/mercedes-amg-gt/mercedes3.jpg",
    "/collections/sports car catagory/mercedes-amg-gt/mercedes4.jpg",
    "/collections/sports car catagory/mercedes-amg-gt/mercedes5.jpg",
    "/collections/sports car catagory/mercedes-amg-gt/mercedes6.jpg",
    "/collections/sports car catagory/mercedes-amg-gt/mercedes7.jpg"
  ],
  "porsche-911-turbo": [
    "/collections/sports car catagory/porsche-911-turbo/porsche1.jpg",
    "/collections/sports car catagory/porsche-911-turbo/porsche2.jpg",
    "/collections/sports car catagory/porsche-911-turbo/porsche3.jpg",
    "/collections/sports car catagory/porsche-911-turbo/porsche4.jpg",
    "/collections/sports car catagory/porsche-911-turbo/porsche5.jpg",
    "/collections/sports car catagory/porsche-911-turbo/porsche6.jpg"
  ],
  "fortuner": [
    "/collections/Suvs/fortuner/Currently_ Screenshotting my future.jpg",
    "/collections/Suvs/fortuner/download (7).jpg",
    "/collections/Suvs/fortuner/download (8).jpg",
    "/collections/Suvs/fortuner/fort.jpg",
    "/collections/Suvs/fortuner/FORTUNER EYES 👀.jpg",
    "/collections/Suvs/fortuner/🦬.jpg"
  ],
  "landcruiser_V8": [
    "/collections/Suvs/landcruiser_V8/download (7).jpg",
    "/collections/Suvs/landcruiser_V8/download (8).jpg",
    "/collections/Suvs/landcruiser_V8/download (9).jpg",
    "/collections/Suvs/landcruiser_V8/Land cruiser.jpg",
    "/collections/Suvs/landcruiser_V8/LC300 🖤.jpg",
    "/collections/Suvs/landcruiser_V8/OO1$.jpg",
    "/collections/Suvs/landcruiser_V8/Toyota Land Cruiser.jpg"
  ],
  "lexus": [
    "/collections/Suvs/lexus/2026 LEXUS LX 700h FSport.jpg",
    "/collections/Suvs/lexus/download (7).jpg",
    "/collections/Suvs/lexus/download (8).jpg",
    "/collections/Suvs/lexus/Lexus LX black light.jpg",
    "/collections/Suvs/lexus/Lx.jpg"
  ],
  "prado": [
    "/collections/Suvs/prado/prado-extra.jpg",
    "/collections/Suvs/prado/download (7).jpg",
    "/collections/Suvs/prado/https___t_me_ivankovsh.jpg",
    "/collections/Suvs/prado/Toyota Land Cruiser Prado-TXL Diesel (1).jpg",
    "/collections/Suvs/prado/Toyota Land Cruiser Prado-TXL Diesel (2).jpg",
    "/collections/Suvs/prado/Toyota Land Cruiser Prado-TXL Diesel.jpg",
    "/collections/Suvs/prado/Toyota Land Cruiser Prado.jpg"
  ],
  "range_rover": [
    "/collections/Suvs/range_rover/2023 Land Rover Range Rover.jpg",
    "/collections/Suvs/range_rover/range-rover-extra.jpg",
    "/collections/Suvs/range_rover/2025 Range Rover SV Black Rear Design 🖤.jpg",
    "/collections/Suvs/range_rover/download (10).jpg",
    "/collections/Suvs/range_rover/download (7).jpg",
    "/collections/Suvs/range_rover/download (8).jpg",
    "/collections/Suvs/range_rover/download (9).jpg",
    "/collections/Suvs/range_rover/Instagram.jpg"
  ],
  "urus": [
    "/collections/Suvs/urus/#lamborghini Urus.jpg",
    "/collections/Suvs/urus/download (7).jpg",
    "/collections/Suvs/urus/Lambo.jpg",
    "/collections/Suvs/urus/Lamborghini Urus Photoshoot.jpg",
    "/collections/Suvs/urus/Lamborghini Urus- IG@fennpicart.jpg",
    "/collections/Suvs/urus/Lamborghini Urus.jpg",
    "/collections/Suvs/urus/White coloured monstrous lamborghini urus_.jpg"
  ]
};

function buildMediaForCar(car) {
    const videoSrc = videoMap[car.id] || "/videos/my-car-video.mp4"; // fallback if id is not found
    const folderKey = folderKeyMap[car.id];
    const imageList = scannedImages[folderKey] || [car.image];

    return {
        video: {
            type: "video",
            src: videoSrc,
            poster: car.image, // Use the car's existing image as the poster
        },
        images: imageList.map(src => ({
            type: "image",
            src: src,
        })),
    };
}

// Flatten sports/luxury/suv into one { [carId]: { video, images } } map.
const carDetailsData = Object.values(collectionsData)
    .flat()
    .reduce((acc, car) => {
        acc[car.id] = buildMediaForCar(car);
        return acc;
    }, {});

/**
 * Helper: returns the full media list for a car (video first, then
 * images) — exactly the order the thumbnail rail should render in.
 *
 * Accepts the live car object (from CarsContext/the API) rather than
 * just an id, since admin can now set a car's `video` and
 * `galleryImages` directly on the Car document. Those live values take
 * priority when present; anything not yet set by admin falls back to
 * this file's original static lookup, so the 18 launch cars keep
 * working exactly as before until/unless their media is edited.
 */
export function getCarMedia(car) {
    if (!car) return [];

    const fallback = carDetailsData[car.id] ?? buildMediaForCar(car);

    const video = car.video && car.video.trim()
        ? { type: "video", src: car.video, poster: car.image }
        : fallback.video;

    const images = Array.isArray(car.galleryImages) && car.galleryImages.length > 0
        ? car.galleryImages.map((src) => ({ type: "image", src }))
        : fallback.images;

    return [video, ...images];
}

const performanceSpecs = {
    "porsche-911-gt3": { horsepower: "502 HP", zeroToSixty: "3.2s", topSpeed: "197 MPH", highlight: "RWD Track-Spec" },
    "ferrari-488-gtb": { horsepower: "661 HP", zeroToSixty: "3.0s", topSpeed: "205 MPH", highlight: "Twin-Turbo V8" },
    "lamborghini-huracan": { horsepower: "631 HP", zeroToSixty: "2.9s", topSpeed: "202 MPH", highlight: "AWD Performance" },
    "mercedes-amg-gt": { horsepower: "523 HP", zeroToSixty: "3.7s", topSpeed: "194 MPH", highlight: "RWD V8 Biturbo" },
    "bmw-m4-competition": { horsepower: "503 HP", zeroToSixty: "3.4s", topSpeed: "180 MPH", highlight: "AWD Precision" },
    "audi-r8": { horsepower: "602 HP", zeroToSixty: "3.1s", topSpeed: "201 MPH", highlight: "V10 Performance" },
    "mercedes-s-class": { horsepower: "429 HP", zeroToSixty: "4.9s", topSpeed: "155 MPH", highlight: "Executive Lounge" },
    "bmw-7-series": { horsepower: "375 HP", zeroToSixty: "5.2s", topSpeed: "155 MPH", highlight: "Theater Screen" },
    "audi-q8": { horsepower: "335 HP", zeroToSixty: "5.6s", topSpeed: "130 MPH", highlight: "Premium SUV" },
    "Toyota_Crown_rs": { horsepower: "340 HP", zeroToSixty: "5.7s", topSpeed: "120 MPH", highlight: "Dual Boost Hybrid" },
    "bentley-flying-spur": { horsepower: "626 HP", zeroToSixty: "3.7s", topSpeed: "207 MPH", highlight: "W12 Handcrafted" },
    "sonata_n_Line": { horsepower: "290 HP", zeroToSixty: "5.3s", topSpeed: "145 MPH", highlight: "N-Line Turbo FWD" },
    "range-rover-sport": { horsepower: "395 HP", zeroToSixty: "5.4s", topSpeed: "140 MPH", highlight: "Adaptive AWD" },
    "lexus_lx": { horsepower: "409 HP", zeroToSixty: "6.9s", topSpeed: "130 MPH", highlight: "Multi-Terrain Active" },
    "prado": { horsepower: "326 HP", zeroToSixty: "7.5s", topSpeed: "110 MPH", highlight: "Full-Time 4WD" },
    "toyota_fortuner": { horsepower: "201 HP", zeroToSixty: "9.0s", topSpeed: "110 MPH", highlight: "7-Seat Utility" },
    "urus": { horsepower: "657 HP", zeroToSixty: "3.1s", topSpeed: "190 MPH", highlight: "Super SUV AWD" },
    "toyota-land-cruiser": { horsepower: "409 HP", zeroToSixty: "6.7s", topSpeed: "130 MPH", highlight: "Crawl Control AWD" },
};

export function getCarPerformanceSpecs(carId) {
    return performanceSpecs[carId] || { horsepower: "300+ HP", zeroToSixty: "5.0s", topSpeed: "150 MPH", highlight: "Premium Class" };
}

export default carDetailsData;