from django.core.management.base import BaseCommand
from api.models import City, Landmark

CITIES_DATA = [
    {
        "name": "Moscow",
        "slug": "moscow",
        "description": "Russia's sprawling capital, a city of breathtaking contrasts — golden onion domes beside Soviet skyscrapers, avant-garde galleries steps from medieval fortresses.",
        "hero_image_url": "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1600",
        "landmarks": [
            {
                "name": "The Kremlin",
                "description": "The fortified complex at the heart of Moscow is the official residence of the Russian President. Its red-brick walls enclose five palaces, four cathedrals, and the iconic Kremlin towers — a symbol of Russian power spanning six centuries.",
                "image_url": "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800",
                "address": "Kremlin, Moscow, 103073",
                "order": 1,
            },
            {
                "name": "Red Square",
                "description": "The vast cobblestone plaza flanked by the Kremlin, St. Basil's Cathedral, and the GUM department store is the symbolic center of Russia. Every major national event has unfolded across these ancient stones.",
                "image_url": "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800",
                "address": "Red Square, Moscow",
                "order": 2,
            },
            {
                "name": "Saint Basil's Cathedral",
                "description": "Commissioned by Ivan the Terrible to commemorate the capture of Kazan, this 16th-century cathedral with its candy-colored onion domes is the most recognizable building in Russia and one of the world's great architectural wonders.",
                "image_url": "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800",
                "address": "Red Square, 2, Moscow, 109012",
                "order": 3,
            },
            {
                "name": "Bolshoi Theatre",
                "description": "One of the world's foremost opera and ballet companies, the Bolshoi has graced Moscow since 1776. Its neoclassical facade with the iconic bronze quadriga is an enduring emblem of Russian culture and artistic excellence.",
                "image_url": "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?w=800",
                "address": "Theatre Square, 1, Moscow, 125009",
                "order": 4,
            },
            {
                "name": "Tretyakov Gallery",
                "description": "Home to the world's greatest collection of Russian fine art, the Tretyakov holds over 190,000 works spanning icons from the 11th century to contemporary installations. Its fairy-tale red-brick façade was designed by Viktor Vasnetsov.",
                "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                "address": "Lavrushinsky Lane, 10, Moscow, 119017",
                "order": 5,
            },
            {
                "name": "Gorky Park",
                "description": "Stretching along the Moskva River, this iconic park has transformed from a Soviet pleasure ground into a world-class urban destination with a contemporary art museum, open-air cinema, skating rinks, and beach volleyball courts.",
                "image_url": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
                "address": "Krymsky Val, 9, Moscow, 119049",
                "order": 6,
            },
            {
                "name": "Moscow Metro",
                "description": "Often called 'the people's palaces', Moscow's metro stations are subterranean architectural masterpieces. Mayakovskaya, Komsomolskaya, and Kievskaya dazzle with mosaics, marble columns, and elaborate chandeliers — underground museums few cities can rival.",
                "image_url": "https://images.unsplash.com/photo-1551867640-42b2e9e5ea28?w=800",
                "address": "Moscow Metro System",
                "order": 7,
            },
            {
                "name": "Sparrow Hills",
                "description": "The highest natural point in Moscow offers the city's most dramatic panorama. The main building of Moscow State University — a Stalinist skyscraper of extraordinary scale — looms behind as the entire cityscape stretches to the horizon.",
                "image_url": "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800",
                "address": "Sparrow Hills, Moscow, 119992",
                "order": 8,
            },
            {
                "name": "Novodevichy Convent",
                "description": "A UNESCO World Heritage Site, this 16th-century convent is a masterpiece of Moscow Baroque. Its white-washed walls and bell towers are mirrored in an adjacent pond, and its cemetery holds the graves of Chekhov, Gogol, and Shostakovich.",
                "image_url": "https://images.unsplash.com/photo-1519923834699-ef0b7ded4f1f?w=800",
                "address": "Novodevichy Proezd, 1, Moscow, 119435",
                "order": 9,
            },
            {
                "name": "Cathedral of Christ the Saviour",
                "description": "The tallest Orthodox church in the world at 105 metres, this gleaming white cathedral was originally built to commemorate Russia's victory over Napoleon, demolished by Stalin, and magnificently rebuilt and reconsecrated in 2000.",
                "image_url": "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800",
                "address": "Volkhonka St, 15, Moscow, 119019",
                "order": 10,
            },
        ],
    },
    {
        "name": "Saint Petersburg",
        "slug": "saint-petersburg",
        "description": "Peter the Great's window to Europe — a city of baroque palaces, canals, and the world's greatest art museum, built on marshland and sheer imperial ambition.",
        "hero_image_url": "https://images.unsplash.com/photo-1548834925-e48f8a37e2e0?w=1600",
        "landmarks": [
            {
                "name": "The Hermitage Museum",
                "description": "One of the world's largest and most prestigious art museums, the Hermitage occupies the Winter Palace and five other historic buildings. Its 3 million items span from Egyptian antiquities to Impressionist masterpieces, Rembrandts, and Da Vincis.",
                "image_url": "https://images.unsplash.com/photo-1548834925-e48f8a37e2e0?w=800",
                "address": "Palace Square, 2, Saint Petersburg, 190000",
                "order": 1,
            },
            {
                "name": "Church of the Savior on Spilled Blood",
                "description": "Built on the site where Tsar Alexander II was assassinated in 1881, this explosion of multi-colored onion domes and intricate mosaics is St. Petersburg's most photographed landmark — a Russian Orthodox jewel surrounded by the city's classical European architecture.",
                "image_url": "https://images.unsplash.com/photo-1571155027773-b5cbbce4e41c?w=800",
                "address": "Griboyedov Canal Embankment, 2, Saint Petersburg",
                "order": 2,
            },
            {
                "name": "Peter and Paul Fortress",
                "description": "The original citadel from which St. Petersburg grew, founded by Peter the Great in 1703. Within its walls stands the Peter and Paul Cathedral, burial place of the Romanov tsars, its gilded spire the city's oldest and most distinctive silhouette.",
                "image_url": "https://images.unsplash.com/photo-1556908048-abf4b5f45cbf?w=800",
                "address": "Petropavlovskaya Fortress, Saint Petersburg, 197046",
                "order": 3,
            },
            {
                "name": "Peterhof Palace",
                "description": "Nicknamed the 'Russian Versailles', Peterhof stuns with over 150 fountains and gilded statues cascading down terraced gardens to the Gulf of Finland. The Great Cascade, with its central Samson fountain, remains one of Europe's most spectacular water features.",
                "image_url": "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?w=800",
                "address": "Razvodnaya St, 2, Peterhof, Saint Petersburg, 198516",
                "order": 4,
            },
            {
                "name": "Palace Square",
                "description": "The vast ceremonial heart of St. Petersburg, framed by the magnificent Winter Palace on one side and the curved arc of the General Staff Building on the other. The 47-metre Alexander Column at its center is the tallest of its kind in the world.",
                "image_url": "https://images.unsplash.com/photo-1548834925-e48f8a37e2e0?w=800",
                "address": "Palace Square, Saint Petersburg, 190000",
                "order": 5,
            },
            {
                "name": "St. Isaac's Cathedral",
                "description": "The largest Orthodox cathedral in Russia took 40 years to build and can hold 14,000 worshippers. Its gilded dome dominates the St. Petersburg skyline, and the colonnade walkway at the top offers the city's most breathtaking 360-degree panorama.",
                "image_url": "https://images.unsplash.com/photo-1556908048-abf4b5f45cbf?w=800",
                "address": "St. Isaac's Square, 4, Saint Petersburg, 190000",
                "order": 6,
            },
            {
                "name": "Nevsky Prospect",
                "description": "St. Petersburg's grand main avenue stretches 4.5 km from the Admiralty to the Alexander Nevsky Monastery. Lined with Baroque and Neoclassical buildings, luxury boutiques, bookshops, cafes, and the magnificent Kazan Cathedral, it is the city's beating heart.",
                "image_url": "https://images.unsplash.com/photo-1571155027773-b5cbbce4e41c?w=800",
                "address": "Nevsky Prospect, Saint Petersburg",
                "order": 7,
            },
            {
                "name": "Mariinsky Theatre",
                "description": "One of the world's premier opera and ballet companies, the Mariinsky has launched the careers of Nureyev, Baryshnikov, and Pavlova. The opulent turquoise and gold auditorium of the historic building remains one of the most beautiful performance spaces on Earth.",
                "image_url": "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?w=800",
                "address": "Theatre Square, 1, Saint Petersburg, 190000",
                "order": 8,
            },
            {
                "name": "Tsarskoye Selo",
                "description": "The imperial summer residence 25 km south of the city holds the legendary Catherine Palace with its breathtaking Blue and Gold Baroque facade. The recently restored Amber Room — once called the Eighth Wonder of the World — is its most celebrated interior.",
                "image_url": "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?w=800",
                "address": "Sadovaya St, 7, Pushkin, Saint Petersburg, 196601",
                "order": 9,
            },
            {
                "name": "The Bronze Horseman",
                "description": "Falconet's iconic equestrian statue of Peter the Great rearing above Senate Square has stood since 1782. Immortalized by Pushkin's poem of the same name, this symbol of St. Petersburg's founding is one of the most recognized monuments in all of Russia.",
                "image_url": "https://images.unsplash.com/photo-1556908048-abf4b5f45cbf?w=800",
                "address": "Senate Square, Saint Petersburg, 190000",
                "order": 10,
            },
        ],
    },
    {
        "name": "Kazan",
        "slug": "kazan",
        "description": "Where East meets West — the ancient Tatar capital on the Volga is a city of mosques and Orthodox churches, kremlin towers and contemporary architecture, where two great civilizations have coexisted for centuries.",
        "hero_image_url": "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=1600",
        "landmarks": [
            {
                "name": "Kazan Kremlin",
                "description": "A UNESCO World Heritage Site and the only surviving Tatar fortress-kremlin in Russia. Built in the 16th century on the orders of Ivan the Terrible after the conquest of Kazan, it uniquely blends Tatar and Russian architectural traditions within its ancient white walls.",
                "image_url": "https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=800",
                "address": "Kremlevskaya St, 3, Kazan, 420014",
                "order": 1,
            },
            {
                "name": "Kul Sharif Mosque",
                "description": "The centerpiece of the Kazan Kremlin and one of the largest mosques in Russia, Kul Sharif was reconstructed in 2005 to honor the legendary 16th-century mosque destroyed by Ivan the Terrible. Its four minarets and turquoise domes are a symbol of Tatar Muslim identity.",
                "image_url": "https://images.unsplash.com/photo-1593001874117-c99c800e3eb6?w=800",
                "address": "Kremlin, Kazan, 420014",
                "order": 2,
            },
            {
                "name": "Kazan Cathedral of the Annunciation",
                "description": "This striking 16th-century Orthodox cathedral stands within the Kremlin walls. Its white limestone architecture, with a blend of Russian and Pskov styles, was built on Ivan the Terrible's orders — a statement of Russian dominion over the newly conquered Kazan Khanate.",
                "image_url": "https://images.unsplash.com/photo-1519923834699-ef0b7ded4f1f?w=800",
                "address": "Kremlin, Kazan, 420014",
                "order": 3,
            },
            {
                "name": "The Falling Tower of Kazan (Söyembikä)",
                "description": "This leaning seven-tiered tower within the Kremlin complex is one of Kazan's most enduring symbols. Standing 58 metres tall, it has a visible tilt of nearly two metres and is surrounded by legend — most famously that Queen Söyembikä leapt from its summit after the fall of Kazan.",
                "image_url": "https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=800",
                "address": "Kremlin, Kazan, 420014",
                "order": 4,
            },
            {
                "name": "Kazan Federal University",
                "description": "Founded in 1804, this prestigious institution counts Leo Tolstoy and Lenin among its alumni. Its imposing neoclassical main building on Kremlyovskaya Street is a cornerstone of Kazan's intellectual identity, and its campus is one of the most beautiful in Russia.",
                "image_url": "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?w=800",
                "address": "Kremlyovskaya St, 18, Kazan, 420008",
                "order": 5,
            },
            {
                "name": "Temple of All Religions",
                "description": "Perhaps the most visually striking structure in Kazan, this eclectic building combines a church, mosque, synagogue, and pagoda under one roof — a statement of universal spiritual harmony. Its colourful towers and domes make it one of Russia's most photographed contemporary landmarks.",
                "image_url": "https://images.unsplash.com/photo-1593001874117-c99c800e3eb6?w=800",
                "address": "Staraya Kazan trakt, 3, Kazan",
                "order": 6,
            },
            {
                "name": "Kazan Riviera",
                "description": "A vast leisure complex on the shores of the Kazanka River, featuring a waterpark, sandy beach, and the contemporary Kazan Arena stadium rising dramatically behind it. The waterfront offers sweeping views of the Kremlin and is a beloved gathering place for locals.",
                "image_url": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
                "address": "Pervaya Portovaya St, 1a, Kazan",
                "order": 7,
            },
            {
                "name": "National Museum of the Republic of Tatarstan",
                "description": "Housed in a magnificent late 19th-century merchant's mansion, this museum holds over 900,000 artifacts chronicling Tatar culture, history, and the ancient Volga Bulgaria civilization — making it the most comprehensive repository of Tatar heritage in the world.",
                "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                "address": "Kremlyovskaya St, 2, Kazan, 420014",
                "order": 8,
            },
            {
                "name": "Kazan Zoo",
                "description": "One of the oldest zoos in Russia, Kazan Zoo was founded in 1806 and recently underwent a dramatic modern renovation. Set across a large park, it houses over 280 species and has become a flagship cultural destination celebrating both wildlife and Tatar architectural heritage.",
                "image_url": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
                "address": "Yamashev Prospect, 25, Kazan",
                "order": 9,
            },
            {
                "name": "Tatar State Academic Opera and Ballet Theatre",
                "description": "The grand neoclassical building dominates Svobody Square at the heart of Kazan. One of Russia's leading opera and ballet houses, it is the cultural soul of the Republic of Tatarstan, presenting both classical masterworks and uniquely Tatar operatic repertoire.",
                "image_url": "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?w=800",
                "address": "Svobody Square, 1, Kazan, 420015",
                "order": 10,
            },
        ],
    },
]


class Command(BaseCommand):
    help = 'Seed the database with cities and landmarks'

    def handle(self, *args, **kwargs):
        for city_data in CITIES_DATA:
            landmarks_data = city_data.pop('landmarks')
            city, created = City.objects.update_or_create(
                slug=city_data['slug'], defaults=city_data
            )
            action = 'Created' if created else 'Updated'
            self.stdout.write(f'{action} city: {city.name}')

            for lm_data in landmarks_data:
                Landmark.objects.update_or_create(
                    city=city, order=lm_data['order'], defaults=lm_data
                )
            self.stdout.write(f'  → {len(landmarks_data)} landmarks seeded')

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
