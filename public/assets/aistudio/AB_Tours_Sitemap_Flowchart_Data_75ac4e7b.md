## Sheet: Section Names

| Internal term | Menu label (what visitors see) | URL pattern | Example page |
| --- | --- | --- | --- |
| Inbound destinations | Discover the Gulf | /destinations/{country}/{city} | /destinations/uae/dubai |
| Tour packages | Tour Packages | /tour-packages/{country}/{package} | /tour-packages/saudi-arabia/4-day-alula-heritage-tour |
| Themes | Travel Styles | /travel-styles/{style} | /travel-styles/luxury |
| Activities | Things To Do | /things-to-do/{city}/{activity} | /things-to-do/dubai/desert-safari |
| Source markets | Travelling From | /travel-from/{region or country} | /travel-from/nigeria, /travel-from/lithuania |
| Outbound | Holidays Abroad | /holidays/{destination} | /holidays/georgia |
| MICE | Corporate & Events | /corporate-events/{type} | /corporate-events/incentive-trips |
| Services | Visas & Travel Services | /visas/{country}, /travel-services/{service} | /visas/saudi-arabia |
| B2B | For Travel Agents | /travel-agents/{page} | /travel-agents/become-a-partner |
| Content | Travel Guides · What's On | /travel-guides/{country}/{topic}, /whats-on/{event} | /whats-on/riyadh-season |
| Enquiry | Plan My Trip | /plan-my-trip | /plan-my-trip |
| Examples for Travelling From and Holidays Abroad are placeholders until the client-region and outbound destination lists are confirmed. |  |  |  |

---

## Sheet: Sitemap Pages

| # | Level | Section | Page Name | URL | Parent Page | Page Type | Link | Launch Phase | Arabic URL | Notes | Node ID | Parent Node ID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | Home | AB Tours Home | / |  | Home page |  | P1 | /ar |  | HOME |  |
| 2 | 1 | Discover the Gulf | Discover the Gulf | /destinations | AB Tours Home | Section (menu item) | Child page | P1 | /ar/destinations |  | DEST | HOME |
| 3 | 2 | Discover the Gulf | UAE | /destinations/uae | Discover the Gulf | Page | Child page | P1 | /ar/destinations/uae |  | UAE | DEST |
| 4 | 3 | Discover the Gulf | Dubai | /destinations/uae/dubai | UAE | Page | Child page | P1 | /ar/destinations/uae/dubai |  | DXB | UAE |
| 5 | 3 | Discover the Gulf | Abu Dhabi | /destinations/uae/abu-dhabi | UAE | Page | Child page | P1 | /ar/destinations/uae/abu-dhabi |  | AUH | UAE |
| 6 | 2 | Discover the Gulf | Saudi Arabia | /destinations/saudi-arabia | Discover the Gulf | Page | Child page | P1 | /ar/destinations/saudi-arabia |  | KSA | DEST |
| 7 | 3 | Discover the Gulf | Riyadh | /destinations/saudi-arabia/riyadh | Saudi Arabia | Page | Child page | P1 | /ar/destinations/saudi-arabia/riyadh |  | RUH | KSA |
| 8 | 3 | Discover the Gulf | AlUla | /destinations/saudi-arabia/alula | Saudi Arabia | Page | Child page | P1 | /ar/destinations/saudi-arabia/alula |  | ULA | KSA |
| 9 | 3 | Discover the Gulf | Makkah & Madinah | /destinations/saudi-arabia/makkah-madinah | Saudi Arabia | Page | Child page | P1 | /ar/destinations/saudi-arabia/makkah-madinah | Hands off to Umrah Plus | MAK | KSA |
| 10 | 4 | Discover the Gulf | Umrah Plus |  | Makkah & Madinah | Sister brand (external) | External link |  |  |  | UMRAH | MAK |
| 11 | 2 | Discover the Gulf | Qatar | /destinations/qatar | Discover the Gulf | Page | Child page | P1 | /ar/destinations/qatar |  | QA | DEST |
| 12 | 3 | Discover the Gulf | Doha | /destinations/qatar/doha | Qatar | Page | Child page | P1 | /ar/destinations/qatar/doha |  | DOH | QA |
| 13 | 2 | Discover the Gulf | Multi-Country Tours | /destinations/multi-country-tours | Discover the Gulf | Page | Child page | P2 | /ar/destinations/multi-country-tours |  | MULTI | DEST |
| 14 | 1 | Tour Packages | Tour Packages | /tour-packages | AB Tours Home | Section (menu item) | Child page | P1 | /ar/tour-packages |  | PKG | HOME |
| 15 | 2 | Tour Packages | 5-Day Dubai & Abu Dhabi Family Holiday | /tour-packages/uae/5-day-dubai-abu-dhabi-family-holiday | Tour Packages | Page | Child page | P1 | /ar/tour-packages/uae/5-day-dubai-abu-dhabi-family-holiday |  | P1 | PKG |
| 16 | 2 | Tour Packages | 4-Day AlUla Heritage Tour | /tour-packages/saudi-arabia/4-day-alula-heritage-tour | Tour Packages | Page | Child page | P1 | /ar/tour-packages/saudi-arabia/4-day-alula-heritage-tour |  | P2 | PKG |
| 17 | 2 | Tour Packages | 3-Day Doha Stopover | /tour-packages/qatar/3-day-doha-stopover | Tour Packages | Page | Child page | P1 | /ar/tour-packages/qatar/3-day-doha-stopover |  | P3 | PKG |
| 18 | 1 | Travel Styles | Travel Styles | /travel-styles | AB Tours Home | Section (menu item) | Child page | P1 | /ar/travel-styles |  | STY | HOME |
| 19 | 2 | Travel Styles | Luxury | /travel-styles/luxury | Travel Styles | Page | Child page | P1 | /ar/travel-styles/luxury |  | S1 | STY |
| 20 | 3 | Travel Styles | Luxury Saudi Arabia | /travel-styles/luxury/saudi-arabia | Luxury | Page | Child page | P3 | /ar/travel-styles/luxury/saudi-arabia |  | S1a | S1 |
| 21 | 2 | Travel Styles | Family | /travel-styles/family | Travel Styles | Page | Child page | P1 | /ar/travel-styles/family |  | S2 | STY |
| 22 | 2 | Travel Styles | Halal-Friendly | /travel-styles/halal-friendly | Travel Styles | Page | Child page | P2 | /ar/travel-styles/halal-friendly |  | S3 | STY |
| 23 | 1 | Things To Do | Things To Do | /things-to-do | AB Tours Home | Section (menu item) | Child page | P2 | /ar/things-to-do |  | TTD | HOME |
| 24 | 2 | Things To Do | Dubai Desert Safari | /things-to-do/dubai/desert-safari | Things To Do | Page | Child page | P2 | /ar/things-to-do/dubai/desert-safari |  | T1 | TTD |
| 25 | 2 | Things To Do | Hegra Guided Tour | /things-to-do/alula/hegra-guided-tour | Things To Do | Page | Child page | P2 | /ar/things-to-do/alula/hegra-guided-tour |  | T2 | TTD |
| 26 | 2 | Things To Do | Inland Sea Safari | /things-to-do/doha/inland-sea-safari | Things To Do | Page | Child page | P2 | /ar/things-to-do/doha/inland-sea-safari |  | T3 | TTD |
| 27 | 1 | Travelling From | Travelling From | /travel-from | AB Tours Home | Section (menu item) | Child page | P1 | /ar/travel-from |  | FROM | HOME |
| 28 | 2 | Travelling From | Africa | /travel-from/africa | Travelling From | Page | Child page | P1 | /ar/travel-from/africa |  | AFR | FROM |
| 29 | 3 | Travelling From | Nigeria | /travel-from/nigeria | Africa | Page | Child page | P1 | /ar/travel-from/nigeria | Placeholder market — replace with client-region list | NG | AFR |
| 30 | 4 | Travelling From | UAE Visa for Nigerians | /travel-from/nigeria/uae-visa | Nigeria | Page | Child page | P2 | /ar/travel-from/nigeria/uae-visa |  | NGV | NG |
| 31 | 4 | Travelling From | Dubai Packages from Nigeria | /travel-from/nigeria/dubai-packages | Nigeria | Page | Child page | P3 | /ar/travel-from/nigeria/dubai-packages |  | NGP | NG |
| 32 | 3 | Travelling From | Kenya | /travel-from/kenya | Africa | Page | Child page | P1 | /ar/travel-from/kenya | Placeholder market | KE | AFR |
| 33 | 2 | Travelling From | Baltic States | /travel-from/baltic-states | Travelling From | Page | Child page | P1 | /ar/travel-from/baltic-states |  | BAL | FROM |
| 34 | 3 | Travelling From | Lithuania | /travel-from/lithuania | Baltic States | Page | Child page | P1 | /ar/travel-from/lithuania | Placeholder market | LT | BAL |
| 35 | 3 | Travelling From | Latvia | /travel-from/latvia | Baltic States | Page | Child page | P1 | /ar/travel-from/latvia | Placeholder market | LV | BAL |
| 36 | 1 | Holidays Abroad | Holidays Abroad | /holidays | AB Tours Home | Section (menu item) | Child page | P1 | /ar/holidays |  | HOL | HOME |
| 37 | 2 | Holidays Abroad | Georgia | /holidays/georgia | Holidays Abroad | Page | Child page | P1 | /ar/holidays/georgia | Placeholder destination — replace with outbound list | GE | HOL |
| 38 | 3 | Holidays Abroad | 6-Day Tbilisi & Batumi Package | /holidays/georgia/6-day-tbilisi-batumi-package | Georgia | Page | Child page | P2 | /ar/holidays/georgia/6-day-tbilisi-batumi-package |  | GEP | GE |
| 39 | 3 | Holidays Abroad | Georgia from Riyadh | /holidays/georgia/from-riyadh | Georgia | Page | Child page | P3 | /ar/holidays/georgia/from-riyadh |  | GER | GE |
| 40 | 2 | Holidays Abroad | Azerbaijan | /holidays/azerbaijan | Holidays Abroad | Page | Child page | P1 | /ar/holidays/azerbaijan | Placeholder destination | AZ | HOL |
| 41 | 1 | Corporate & Events | Corporate & Events | /corporate-events | AB Tours Home | Section (menu item) | Child page | P1 | /ar/corporate-events |  | CORP | HOME |
| 42 | 2 | Corporate & Events | Incentive Trips | /corporate-events/incentive-trips | Corporate & Events | Page | Child page | P1 | /ar/corporate-events/incentive-trips |  | C1 | CORP |
| 43 | 2 | Corporate & Events | Conferences | /corporate-events/conferences | Corporate & Events | Page | Child page | P1 | /ar/corporate-events/conferences |  | C2 | CORP |
| 44 | 2 | Corporate & Events | Exhibitions | /corporate-events/exhibitions | Corporate & Events | Page | Child page | P2 | /ar/corporate-events/exhibitions |  | C3 | CORP |
| 45 | 2 | Corporate & Events | Group Tours | /group-tours | Corporate & Events | Page | Child page | P2 | /ar/group-tours |  | C4 | CORP |
| 46 | 1 | Visas & Travel Services | Visas & Travel Services | /visas · /travel-services | AB Tours Home | Section (menu item) | Child page | P1 | /ar/visas · /travel-services |  | VIS | HOME |
| 47 | 2 | Visas & Travel Services | UAE Visa | /visas/uae | Visas & Travel Services | Page | Child page | P1 | /ar/visas/uae |  | V1 | VIS |
| 48 | 2 | Visas & Travel Services | Saudi Visa | /visas/saudi-arabia | Visas & Travel Services | Page | Child page | P1 | /ar/visas/saudi-arabia |  | V2 | VIS |
| 49 | 2 | Visas & Travel Services | Qatar Visa | /visas/qatar | Visas & Travel Services | Page | Child page | P1 | /ar/visas/qatar |  | V3 | VIS |
| 50 | 2 | Visas & Travel Services | Hotel Bookings | /travel-services/hotel-bookings | Visas & Travel Services | Page | Child page | P2 | /ar/travel-services/hotel-bookings |  | V4 | VIS |
| 51 | 2 | Visas & Travel Services | Airport Transfers | /travel-services/airport-transfers | Visas & Travel Services | Page | Child page | P1 | /ar/travel-services/airport-transfers | Powered by AB Transport, links to ab.limo | V5 | VIS |
| 52 | 3 | Visas & Travel Services | AB Transport · ab.limo |  | Airport Transfers | Sister brand (external) | External link |  |  |  | ABL | V5 |
| 53 | 1 | For Travel Agents | For Travel Agents | /travel-agents | AB Tours Home | Section (menu item) | Child page | P1 | /ar/travel-agents |  | AGT | HOME |
| 54 | 2 | For Travel Agents | Become a Partner | /travel-agents/become-a-partner | For Travel Agents | Page | Child page | P1 | /ar/travel-agents/become-a-partner | Becomes the OTA agent sign-up | A1 | AGT |
| 55 | 2 | For Travel Agents | Request Rates | /travel-agents/request-rates | For Travel Agents | Page | Child page | P1 | /ar/travel-agents/request-rates |  | A2 | AGT |
| 56 | 2 | For Travel Agents | Fam Trips | /travel-agents/fam-trips | For Travel Agents | Page | Child page | P2 | /ar/travel-agents/fam-trips |  | A3 | AGT |
| 57 | 2 | For Travel Agents | Brochures | /travel-agents/brochures | For Travel Agents | Page | Child page | P2 | /ar/travel-agents/brochures |  | A4 | AGT |
| 58 | 1 | Travel Guides & What's On | Travel Guides & What's On | /travel-guides · /whats-on | AB Tours Home | Section (menu item) | Child page | P1 | /ar/travel-guides · /whats-on |  | GUI | HOME |
| 59 | 2 | Travel Guides & What's On | What to Wear in Saudi Arabia | /travel-guides/saudi-arabia/what-to-wear | Travel Guides & What's On | Page | Child page | P2 | /ar/travel-guides/saudi-arabia/what-to-wear |  | G1 | GUI |
| 60 | 2 | Travel Guides & What's On | Riyadh Season | /whats-on/riyadh-season | Travel Guides & What's On | Page | Child page | P2 | /ar/whats-on/riyadh-season |  | G2 | GUI |
| 61 | 2 | Travel Guides & What's On | FAQ | /faq | Travel Guides & What's On | Page | Child page | P1 | /ar/faq |  | G3 | GUI |
| 62 | 1 | About & Contact | About & Contact | /about-us · /contact-us | AB Tours Home | Section (menu item) | Child page | P1 | /ar/about-us · /contact-us |  | ABT | HOME |
| 63 | 2 | About & Contact | Why Travel With Us | /why-travel-with-us | About & Contact | Page | Child page | P1 | /ar/why-travel-with-us |  | B1 | ABT |
| 64 | 2 | About & Contact | Licences & Accreditations | /licences-and-accreditations | About & Contact | Page | Child page | P1 | /ar/licences-and-accreditations |  | B2 | ABT |
| 65 | 2 | About & Contact | Reviews | /reviews | About & Contact | Page | Child page | P2 | /ar/reviews |  | B3 | ABT |
| 66 | 1 | Plan My Trip | Plan My Trip | /plan-my-trip | AB Tours Home | Conversion page | Child page | P1 | /ar/plan-my-trip | Main enquiry form | PLAN | HOME |

---

## Sheet: Summary

| Section | Pages in flowchart | P1 (launch) | P2 (~2 months) | P3 (scale-up / OTA) |
| --- | --- | --- | --- | --- |
| Discover the Gulf | 12 | 10 | 1 | 0 |
| Tour Packages | 4 | 4 | 0 | 0 |
| Travel Styles | 5 | 3 | 1 | 1 |
| Things To Do | 4 | 0 | 4 | 0 |
| Travelling From | 9 | 7 | 1 | 1 |
| Holidays Abroad | 5 | 3 | 1 | 1 |
| Corporate & Events | 5 | 3 | 2 | 0 |
| Visas & Travel Services | 7 | 5 | 1 | 0 |
| For Travel Agents | 5 | 3 | 2 | 0 |
| Travel Guides & What's On | 4 | 2 | 2 | 0 |
| About & Contact | 4 | 3 | 1 | 0 |
| Plan My Trip | 1 | 1 | 0 | 0 |
| Total (incl. Home) | 66 | 45 | 16 | 3 |
| Notes |  |  |  |  |
| Pages in flowchart are examples per section, not the full page count at launch (~60–80 pages planned for P1). |  |  |  |  |
| Launch phases come from AB_Tours_DMC_Sitemap.md: P1 = at launch, P2 = about 2 months later, P3 = scale-up / OTA launch. |  |  |  |  |
| Sister-brand links (Umrah Plus, ab.limo) count as pages in the total but have no phase. |  |  |  |  |
| Arabic URL column is a formula: it adds /ar in front of each English URL. |  |  |  |  |