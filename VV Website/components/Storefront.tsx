"use client";

import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Heart,
  Instagram,
  Menu,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { FormEvent, MouseEvent, useEffect, useMemo, useState } from "react";

type Product = {
  name: string;
  price: string;
  oldPrice?: string;
  rating: string;
  reviews: number;
  pos: string;
  tag?: string;
};

const collections = [
  { name: "Genshin Impact", pos: "0% 0%", className: "collection-wide" },
  { name: "Wuthering Waves", pos: "33.333% 0%", className: "collection-wide" },
  { name: "Honkai Star Rail", pos: "66.666% 0%" },
  { name: "Naruto", pos: "100% 0%" },
  { name: "One Piece", pos: "0% 100%" },
  { name: "Demon Slayer", pos: "33.333% 100%" },
  { name: "Jujutsu Kaisen", pos: "66.666% 100%" },
  { name: "Solo Leveling", pos: "100% 100%" },
];

const dropProducts: Product[] = [
  {
    name: "Voidwalker Oversized Tee",
    price: "₹1,499",
    oldPrice: "₹1,899",
    rating: "4.9",
    reviews: 218,
    pos: "0% 0%",
    tag: "20% OFF",
  },
  {
    name: "Eclipse Heavyweight Hoodie",
    price: "₹2,699",
    oldPrice: "₹3,199",
    rating: "4.8",
    reviews: 94,
    pos: "33.333% 0%",
    tag: "DROP 06",
  },
  {
    name: "Crimson Moon Boxy Tee",
    price: "₹1,599",
    oldPrice: "₹1,999",
    rating: "4.9",
    reviews: 163,
    pos: "66.666% 0%",
    tag: "20% OFF",
  },
  {
    name: "Abyss Sigil Hoodie",
    price: "₹2,799",
    oldPrice: "₹3,299",
    rating: "4.7",
    reviews: 76,
    pos: "100% 0%",
    tag: "LIMITED",
  },
];

const bestSellers: Product[] = [
  {
    name: "Riftborn Oversized Tee",
    price: "₹1,499",
    rating: "4.9",
    reviews: 312,
    pos: "0% 0%",
  },
  {
    name: "Nightfall Hoodie",
    price: "₹2,599",
    rating: "4.8",
    reviews: 182,
    pos: "33.333% 0%",
  },
  {
    name: "Blood Moon Tee",
    price: "₹1,599",
    rating: "4.9",
    reviews: 247,
    pos: "66.666% 0%",
  },
  {
    name: "Arcane Ring Hoodie",
    price: "₹2,699",
    rating: "4.8",
    reviews: 154,
    pos: "100% 0%",
  },
  {
    name: "Shattered Light Tee",
    price: "₹1,399",
    rating: "4.7",
    reviews: 119,
    pos: "0% 100%",
  },
  {
    name: "Cataclysm Art Print",
    price: "₹799",
    rating: "4.9",
    reviews: 205,
    pos: "33.333% 100%",
  },
  {
    name: "Eclipse Enamel Pin Set",
    price: "₹599",
    rating: "4.8",
    reviews: 88,
    pos: "66.666% 100%",
  },
  {
    name: "Void Crest Keychain",
    price: "₹449",
    rating: "4.9",
    reviews: 136,
    pos: "100% 100%",
  },
];

const categories = [
  {
    name: "Oversized Tees",
    copy: "Premium heavyweight cotton with anime-inspired artwork.",
    pos: "0% 0%",
    className: "cat-tall",
  },
  {
    name: "Hoodies",
    copy: "Comfort meets fandom.",
    pos: "33.333% 0%",
  },
  {
    name: "Posters",
    copy: "Museum-grade wall art.",
    pos: "33.333% 100%",
  },
  {
    name: "Stickers",
    copy: "Affordable collectibles.",
    pos: "66.666% 100%",
  },
  {
    name: "Accessories",
    copy: "Pins, keychains and more.",
    pos: "100% 100%",
  },
  {
    name: "Figures",
    copy: "Limited edition collectibles.",
    pos: "66.666% 0%",
    className: "cat-wide",
  },
];

const artists = [
  {
    name: "Aanya Rao",
    specialty: "Dark fantasy illustration",
    pos: "0% 100%",
    handle: "@aanyadraws",
  },
  {
    name: "Mira Sen",
    specialty: "Character & apparel art",
    pos: "50% 0%",
    handle: "@mirasen.art",
  },
  {
    name: "Arjun Bose",
    specialty: "Graphic narratives",
    pos: "50% 100%",
    handle: "@arjunframes",
  },
];

const community = [
  { user: "@dev.afterdark", product: "Nightfall Hoodie", pos: "0% 0%", likes: "2.4k" },
  { user: "@mira.jpg", product: "Arcane Muse Tee", pos: "50% 0%", likes: "3.1k" },
  { user: "@rohan.exe", product: "Ronin Hoodie", pos: "100% 0%", likes: "1.8k" },
  { user: "@ananya.ink", product: "Mooncall Tee", pos: "0% 100%", likes: "4.2k" },
  { user: "@sid.onfilm", product: "Wave Rider Tee", pos: "50% 100%", likes: "2.7k" },
  { user: "@ishita.wav", product: "Wisteria Hoodie", pos: "100% 100%", likes: "3.6k" },
];

const reviews = [
  {
    quote: "The print quality is insane and the fabric feels genuinely premium. This is the first oversized tee that fits exactly how I wanted.",
    name: "Rhea K.",
    meta: "Verified buyer · Bengaluru",
  },
  {
    quote: "The hoodie has serious weight without feeling stiff. The packaging, art card, and finish made the whole drop feel special.",
    name: "Dhruv M.",
    meta: "Verified buyer · Mumbai",
  },
  {
    quote: "Finally, fandom merch I can wear outside a convention. Clean design, great fit, and it survived the wash perfectly.",
    name: "Sana A.",
    meta: "Verified buyer · Hyderabad",
  },
];

function Mark() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className="brand-mark">
      <path d="M4 5h8l6 17 6-17h8L19 33h-3L4 5Z" fill="currentColor" />
      <path d="m18 3 4 8-4 9-4-9 4-8Z" fill="#ff4d3d" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  copy: string;
  dark?: boolean;
}) {
  return (
    <div className={`section-heading ${dark ? "on-dark" : ""}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      <p>{copy}</p>
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
  onQuickView,
}: {
  product: Product;
  onAdd: () => void;
  onQuickView: () => void;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="product-card">
      <div
        className="product-image sprite-product"
        style={{ backgroundPosition: product.pos }}
        role="img"
        aria-label={product.name}
      >
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className={`round-action ${liked ? "active" : ""}`}
          onClick={() => setLiked((value) => !value)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={17} fill={liked ? "currentColor" : "none"} />
        </button>
        <button className="quick-view" onClick={onQuickView}>
          Quick view
        </button>
      </div>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <div className="price">
            {product.price}
            {product.oldPrice && <del>{product.oldPrice}</del>}
          </div>
        </div>
        <div className="rating">
          <Star size={13} fill="currentColor" /> {product.rating}
          <span>({product.reviews})</span>
        </div>
      </div>
      <button className="add-button" onClick={onAdd}>
        Add to cart <ShoppingBag size={16} />
      </button>
    </article>
  );
}

function MagneticLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  const [transform, setTransform] = useState("");
  function move(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.14;
    setTransform(`translate(${x}px, ${y}px)`);
  }
  return (
    <a
      href={href}
      className={`magnetic-button ${secondary ? "secondary" : ""}`}
      style={{ transform }}
      onMouseMove={move}
      onMouseLeave={() => setTransform("")}
    >
      {children} <ArrowRight size={17} />
    </a>
  );
}

export default function Storefront() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartNotice, setCartNotice] = useState("");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [review, setReview] = useState(0);
  const [joined, setJoined] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 48,
  });
  const dropDeadline = useMemo(
    () => Date.now() + (2 * 24 * 60 + 15 * 60 + 48) * 60 * 1000,
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const distance = Math.max(0, dropDeadline - Date.now());
      setTimeLeft({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [dropDeadline]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setReview((value) => (value + 1) % reviews.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = quickView || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [quickView, menuOpen]);

  function addToCart(product: Product) {
    setCartCount((value) => value + 1);
    setCartNotice(`${product.name} added to cart`);
    window.setTimeout(() => setCartNotice(""), 2200);
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoined(true);
  }

  function heroMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--hero-x",
      `${(event.clientX - rect.left - rect.width / 2) / 30}px`,
    );
    event.currentTarget.style.setProperty(
      "--hero-y",
      `${(event.clientY - rect.top - rect.height / 2) / 30}px`,
    );
  }

  return (
    <main>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="brand" aria-label="The Versatile Vision home">
          <Mark />
          <span>
            THE VERSATILE
            <b>VISION</b>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {["Home", "Shop", "Collections", "Artists", "New Drops", "Community"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
              >
                {item}
              </a>
            ),
          )}
        </nav>
        <div className="nav-actions">
          <button onClick={() => setSearchOpen((value) => !value)} aria-label="Search">
            <Search />
          </button>
          <button aria-label="Wishlist" className="desktop-action">
            <Heart />
          </button>
          <button aria-label="Account" className="desktop-action">
            <CircleUserRound />
          </button>
          <button aria-label={`Cart with ${cartCount} items`} className="cart-action">
            <ShoppingBag />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
          <button
            aria-label="Open menu"
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
        <div className={`search-drawer ${searchOpen ? "open" : ""}`}>
          <Search size={20} />
          <input placeholder="Search tees, drops, collections..." autoFocus={searchOpen} />
          <button onClick={() => setSearchOpen(false)} aria-label="Close search">
            <X size={19} />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X />
        </button>
        {["Home", "Shop", "Collections", "Artists", "New Drops", "Community"].map(
          (item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span> {item}
            </a>
          ),
        )}
      </div>

      <section id="home" className="hero" onMouseMove={heroMove}>
        <div className="hero-grid" />
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span />
            Limited edition anime merch
          </p>
          <h1>
            WEAR YOUR
            <br />
            <em>FANDOM.</em>
            <br />
            OWN THE LEGEND.
          </h1>
          <p className="hero-description">
            Premium anime and gaming merchandise inspired by the worlds you love.
            From oversized streetwear to exclusive collectibles, every drop is
            designed for true fans.
          </p>
          <div className="hero-buttons">
            <MagneticLink href="#shop">Shop collection</MagneticLink>
            <MagneticLink href="#new-drops" secondary>
              Latest drop
            </MagneticLink>
          </div>
          <div className="hero-stats">
            <div>
              <strong>50K+</strong>
              <span>Customers</span>
            </div>
            <div>
              <strong>250+</strong>
              <span>Designs</span>
            </div>
            <div>
              <strong>4.9</strong>
              <span>Rating</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="edition-pill">DROP 06 · 2026</div>
          <div className="hero-image-wrap">
            <img src="/assets/hero-merch.png" alt="Floating original streetwear merchandise" />
          </div>
          <div className="floating-note note-one">
            <span>01</span>
            <b>Heavyweight cotton</b>
          </div>
          <div className="floating-note note-two">
            <span>02</span>
            <b>Artist made</b>
          </div>
        </div>
        <a href="#collections" className="scroll-cue" aria-label="Scroll to collections">
          <span>Scroll to explore</span>
          <ArrowDown size={16} />
        </a>
      </section>

      <div className="trust-bar" aria-label="Store benefits">
        <div className="trust-track">
          {[...Array(2)].flatMap((_, loop) =>
            [
              "Premium Quality",
              "PAN India Shipping",
              "Secure Payments",
              "Limited Edition Drops",
              "Artist Collaborations",
            ].map((item) => (
              <span key={`${loop}-${item}`}>
                <Sparkles size={15} /> {item}
              </span>
            )),
          )}
        </div>
      </div>

      <section id="collections" className="section light-section">
        <SectionHeading
          eyebrow="Find your universe"
          title="SHOP BY COLLECTION"
          copy="Stories you love, translated into original art and everyday pieces built to be worn on repeat."
        />
        <div className="collection-grid">
          {collections.map((collection, index) => (
            <a
              href="#shop"
              key={collection.name}
              className={`collection-card ${collection.className || ""}`}
            >
              <div
                className="card-art sprite-collection"
                style={{ backgroundPosition: collection.pos }}
              />
              <span className="card-index">0{index + 1}</span>
              <div className="collection-content">
                <p>Explore universe</p>
                <h3>{collection.name}</h3>
                <span className="circle-arrow">
                  <ArrowRight />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="new-drops" className="drop-section">
        <div className="drop-noise" />
        <SectionHeading
          eyebrow="Limited release"
          title="THE CURRENT DROP"
          copy="Available until sold out. Once this collection closes, these pieces enter the archive."
          dark
        />
        <div className="drop-meta">
          <p>Void // Chapter VI</p>
          <div className="countdown" aria-label="Drop countdown">
            {[
              ["Days", timeLeft.days],
              ["Hours", timeLeft.hours],
              ["Minutes", timeLeft.minutes],
            ].map(([label, value]) => (
              <div key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div id="shop" className="product-grid drop-grid">
          {dropProducts.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              onAdd={() => addToCart(product)}
              onQuickView={() => setQuickView(product)}
            />
          ))}
        </div>
        <a href="#shop" className="text-link">
          View the full drop <ArrowRight size={16} />
        </a>
      </section>

      <section className="section light-section">
        <SectionHeading
          eyebrow="Community approved"
          title="FAN FAVORITES"
          copy="The pieces that disappear first, restock after restock."
        />
        <div className="product-grid best-grid">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              onAdd={() => addToCart(product)}
              onQuickView={() => setQuickView(product)}
            />
          ))}
        </div>
      </section>

      <section className="section category-section">
        <SectionHeading
          eyebrow="Built for every kind of fan"
          title="EXPLORE CATEGORIES"
          copy="From heavyweight layers to the small collectibles that make a setup feel like yours."
          dark
        />
        <div className="category-grid">
          {categories.map((category) => (
            <a
              href="#shop"
              className={`category-card ${category.className || ""}`}
              key={category.name}
            >
              <div
                className="card-art sprite-product"
                style={{ backgroundPosition: category.pos }}
              />
              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.copy}</p>
                <span>
                  Shop now <ArrowRight size={15} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="artists" className="section artist-section">
        <SectionHeading
          eyebrow="Creator first"
          title="FEATURED ARTISTS"
          copy="Original work. Fair collaborations. New perspectives from artists shaping visual culture."
        />
        <div className="artist-grid">
          {artists.map((artist, index) => (
            <article className="artist-card" key={artist.name}>
              <div
                className="artist-image sprite-community"
                style={{ backgroundPosition: artist.pos }}
                role="img"
                aria-label={artist.name}
              >
                <span>0{index + 1}</span>
              </div>
              <div className="artist-info">
                <div>
                  <p>{artist.specialty}</p>
                  <h3>{artist.name}</h3>
                  <span>{artist.handle}</span>
                </div>
                <a href="#artists">
                  View portfolio <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="community" className="community-section">
        <SectionHeading
          eyebrow="Tag @theversatilevision"
          title="COMMUNITY FITS"
          copy="Real fans. Real collections. A growing community wearing their worlds out loud."
          dark
        />
        <div className="community-grid">
          {community.map((post) => (
            <a href="#community" className="community-card" key={post.user}>
              <div
                className="community-image sprite-community"
                style={{ backgroundPosition: post.pos }}
              />
              <div className="community-overlay">
                <Instagram size={21} />
                <div>
                  <strong>{post.user}</strong>
                  <span>{post.product}</span>
                </div>
                <p>♥ {post.likes}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="why-heading">
          <p className="eyebrow">No compromises</p>
          <h2>MADE BETTER.<br />DOWN TO THE DETAILS.</h2>
        </div>
        <div className="why-grid">
          {[
            {
              icon: <PackageCheck />,
              title: "Premium Materials",
              copy: "240+ GSM fabrics built for comfort and durability.",
            },
            {
              icon: <Truck />,
              title: "Fast Delivery",
              copy: "Reliable tracked shipping across India.",
            },
            {
              icon: <ShieldCheck />,
              title: "Secure Checkout",
              copy: "Safe and trusted payment methods.",
            },
            {
              icon: <Zap />,
              title: "Exclusive Drops",
              copy: "Limited stock collections that won't return.",
            },
          ].map((item, index) => (
            <article className="why-card" key={item.title}>
              <span className="why-number">0{index + 1}</span>
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        <p className="eyebrow">Words from the community</p>
        <div className="review-layout">
          <div className="review-mark">“</div>
          <article key={review} className="review-card">
            <div className="stars">★★★★★</div>
            <blockquote>{reviews[review].quote}</blockquote>
            <footer>
              <strong>{reviews[review].name}</strong>
              <span>{reviews[review].meta}</span>
            </footer>
          </article>
          <div className="review-controls">
            <button
              onClick={() =>
                setReview((value) => (value - 1 + reviews.length) % reviews.length)
              }
              aria-label="Previous review"
            >
              <ChevronLeft />
            </button>
            <span>
              0{review + 1} / 0{reviews.length}
            </span>
            <button
              onClick={() => setReview((value) => (value + 1) % reviews.length)}
              aria-label="Next review"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-lines" />
        <p className="eyebrow">Members get first access</p>
        <h2>NEVER MISS<br /><em>A DROP.</em></h2>
        <p>
          Get early access to new collections, giveaways and exclusive discounts.
          No spam. Just the good stuff.
        </p>
        {joined ? (
          <div className="joined-message">
            <Sparkles /> You&apos;re in. Welcome to the community.
          </div>
        ) : (
          <form onSubmit={submitNewsletter}>
            <input type="email" placeholder="Enter your email" required aria-label="Email" />
            <button type="submit">
              Join community <ArrowRight size={17} />
            </button>
          </form>
        )}
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <Mark />
              <span>
                THE VERSATILE
                <b>VISION</b>
              </span>
            </a>
            <p>Original streetwear and collectibles for the worlds you carry with you.</p>
            <div className="socials">
              <a href="#community" aria-label="Instagram"><Instagram /></a>
              <a href="#community" aria-label="YouTube"><Youtube /></a>
              <a href="#community" aria-label="X">X</a>
            </div>
          </div>
          {[
            ["Shop", "All Products", "New Arrivals", "Best Sellers", "Collections"],
            ["Company", "About", "Contact", "Careers"],
            ["Support", "Shipping Policy", "Returns", "FAQ", "Terms"],
          ].map(([heading, ...links]) => (
            <div className="footer-column" key={heading}>
              <h3>{heading}</h3>
              {links.map((link) => <a href="#shop" key={link}>{link}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-wordmark">VERSATILE VISION</div>
        <div className="footer-bottom">
          <span>© 2026 The Versatile Vision.</span>
          <span>Crafted for fans.</span>
          <span>India / INR</span>
        </div>
      </footer>

      {quickView && (
        <div className="modal-backdrop" onMouseDown={() => setQuickView(null)}>
          <div className="quick-modal" onMouseDown={(event) => event.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setQuickView(null)}
              aria-label="Close quick view"
            >
              <X />
            </button>
            <div
              className="modal-image sprite-product"
              style={{ backgroundPosition: quickView.pos }}
            />
            <div className="modal-content">
              <p className="eyebrow">The Versatile Vision</p>
              <h2>{quickView.name}</h2>
              <div className="modal-price">{quickView.price}</div>
              <p>
                Premium construction, original artist-made graphics, and a relaxed
                unisex fit made for repeat wear.
              </p>
              <div className="size-row">
                {["S", "M", "L", "XL"].map((size) => <button key={size}>{size}</button>)}
              </div>
              <button
                className="modal-add"
                onClick={() => {
                  addToCart(quickView);
                  setQuickView(null);
                }}
              >
                Add to cart <ShoppingBag size={17} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`cart-toast ${cartNotice ? "show" : ""}`}>
        <ShoppingBag size={17} /> {cartNotice}
      </div>
    </main>
  );
}
