import Link from "next/link";
import Image from "next/image";
import { getDishes } from "@/lib/dishes";
import { toSlug } from "./menu/slug";
import AddToCartButton from "./menu/AddToCartButton";

export default async function HomePage() {
  const allDishes = await getDishes();
  const specials = allDishes.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      <section className="relative pt-6 pb-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#eae8e1] shadow-xs">
              <span className="w-7 h-7 rounded-full bg-[#e8f5ed] flex items-center justify-center text-sm">
                👩‍🍳
              </span>
              <span className="text-xs font-bold text-[#374151]">
                Chef&apos;s Special &bull; <span className="text-[#0c5836]">Organic Passion</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111827] leading-[1.1]">
              SNACK TIME HEALS <br />
              <span className="text-[#0c5836]">ALL WOUNDS</span>
            </h1>

            <p className="text-sm sm:text-base text-[#4b5563] max-w-lg leading-relaxed">
              Experience the genuine warmth of Ethiopian kitchens. From sizzling Sambusa and prime Steaks
              to Smokey Burgers and sweet Honey Baklava, crafted with hand-picked organic ingredients.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                href="/menu"
                className="px-8 py-3.5 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Order Now &rarr;
              </Link>
              <div className="flex items-baseline gap-1 text-sm font-bold text-[#374151]">
                <span className="text-xs text-[#6b7280]">Dishes from:</span>
                <span className="text-xl font-black text-[#0c5836]">100 Birr</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="absolute w-80 h-80 bg-[#e8f5ed] rounded-full blur-3xl -z-10 opacity-70"></div>

            <div className="relative p-6 max-w-md w-full text-center">
              <div className="absolute top-2 right-4 z-10 w-16 h-16 rounded-full bg-red-600 text-white flex flex-col items-center justify-center font-black text-center shadow-lg border-2 border-white transform rotate-12">
                <span className="text-[10px] leading-none uppercase">Sale</span>
                <span className="text-xs leading-none">50%</span>
                <span className="text-[8px] leading-none">OFF</span>
              </div>

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center motion-safe:animate-float">
                <Image
                  src="/images/main-hero.png"
                  alt="Signature Addis Eats Ethiopian dining feast featuring hot wats, injera, and sizzling tibs"
                  width={480}
                  height={480}
                  priority={true}
                  quality={85}
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 480px"
                  className="object-contain w-full h-full drop-shadow-2xl"
                />
              </div>

              <div className="absolute -bottom-4 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#eae8e1] shadow-lg flex items-center gap-3">
                <span className="text-2xl">🌱</span>
                <div className="text-left">
                  <div className="text-xs font-black text-[#111827]">100% Organic</div>
                  <div className="text-[10px] text-[#6b7280]">Ethiopian Highlands</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#eae8e1] shadow-xs hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#e8f5ed] text-[#0c5836] flex items-center justify-center text-2xl mb-4">
            🛡️
          </div>
          <h3 className="font-extrabold text-sm text-[#111827]">100% Guaranteed Quality</h3>
          <p className="text-xs text-[#6b7280] mt-1.5 leading-relaxed">
            Finest organic ingredients inspected daily from Addis local farmers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#eae8e1] shadow-xs hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#e8f5ed] text-[#0c5836] flex items-center justify-center text-2xl mb-4">
            🌿
          </div>
          <h3 className="font-extrabold text-sm text-[#111827]">Organic Production</h3>
          <p className="text-xs text-[#6b7280] mt-1.5 leading-relaxed">
            Authentic cooking without artificial preservatives or flavor enhancers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#eae8e1] shadow-xs hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#e8f5ed] text-[#0c5836] flex items-center justify-center text-2xl mb-4">
            📜
          </div>
          <h3 className="font-extrabold text-sm text-[#111827]">Food Law Certified</h3>
          <p className="text-xs text-[#6b7280] mt-1.5 leading-relaxed">
            Certified safe hygiene and certified authentic culinary kitchen operations.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#eae8e1] shadow-xs hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#e8f5ed] text-[#0c5836] flex items-center justify-center text-2xl mb-4">
            🍯
          </div>
          <h3 className="font-extrabold text-sm text-[#111827]">100% Authentic Spices</h3>
          <p className="text-xs text-[#6b7280] mt-1.5 leading-relaxed">
            Pure berbere, niter kibbeh herbal butter, and natural mountain honey.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-[#eae8e1] p-8 sm:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#0c5836] text-white flex flex-col justify-between">
              <span className="text-3xl">⭐</span>
              <div className="mt-6">
                <div className="text-2xl font-black">4.9 Rating</div>
                <p className="text-xs text-[#a7f3d0] mt-1 font-medium">
                  Over 1,200 verified foodies in Addis Ababa
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#faf9f5] border border-[#eae8e1] flex flex-col items-center justify-center p-6 text-center">
              <span className="text-5xl">🍹</span>
              <span className="text-xs font-bold text-[#111827] mt-3">Cold Drinks</span>
              <span className="text-[10px] text-[#6b7280]">Natural Juices</span>
            </div>

            <div className="rounded-2xl bg-[#faf9f5] border border-[#eae8e1] flex flex-col items-center justify-center p-6 text-center">
              <span className="text-5xl">🥩</span>
              <span className="text-xs font-bold text-[#111827] mt-3">Prime Mains</span>
              <span className="text-[10px] text-[#6b7280]">Steak &amp; Tibs</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#e8f5ed] text-[#0c5836] flex flex-col justify-between">
              <div className="text-3xl font-black">25+ Years</div>
              <p className="text-xs font-bold text-[#0c5836]/80 mt-2">
                Preserving authentic culinary recipes since 1999.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#0c5836]">
              Nutrition &amp; Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight leading-tight">
              Fresh Food &amp; Juices Help Your <br />
              <span className="text-[#0c5836]">Harmonious &amp; Relation Health</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
              Sharing a feast of freshly prepared dishes and natural refreshments
              brings families and friends together. Healthy, nutrient-rich meals made with love.
            </p>

            <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#eae8e1] flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <p className="text-xs font-semibold text-[#374151]">
                &ldquo;They also deliver warm &amp; fresh right to our gate! Best dining experience in town.&rdquo;
              </p>
            </div>

            <div>
              <Link
                href="/menu"
                className="inline-block px-7 py-3 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider transition-all"
              >
                Explore Menu &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#eae8e1] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-black text-[#0c5836]">1989</div>
            <p className="text-xs font-bold text-[#111827] mt-1">Founding Kitchen</p>
            <p className="text-[11px] text-[#6b7280]">First traditional kitchen in Piassa.</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#0c5836]">2002</div>
            <p className="text-xs font-bold text-[#111827] mt-1">Recipe Innovation</p>
            <p className="text-[11px] text-[#6b7280]">Layered fresh juices &amp; gourmet steaks.</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#0c5836]">2008</div>
            <p className="text-xs font-bold text-[#111827] mt-1">Citywide Delivery</p>
            <p className="text-[11px] text-[#6b7280]">Riders across Bole, Kazanchis, CMC.</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#0c5836]">2026</div>
            <p className="text-xs font-bold text-[#111827] mt-1">Next.js App Router</p>
            <p className="text-[11px] text-[#6b7280]">Instant online ordering system.</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#0c5836]">
            Our Handcrafted Selection
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
            Explore Our <span className="text-[#0c5836]">Signature Dishes</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6b7280]">
            Freshly prepared and sealed for pristine delivery right to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-2xl border border-[#eae8e1] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#e8f5ed] text-[#0c5836]">
                    {dish.category}
                  </span>
                  <span className="text-xs">🌿 Fresh</span>
                </div>

                <div className="relative h-44 w-full bg-[#faf9f5] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={dish.image}
                    alt={dish.alt || `Special dish: ${dish.name} prepared fresh at Addis Eats`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-extrabold text-base text-[#111827] group-hover:text-[#0c5836] transition-colors">
                  <Link href={`/menu/${toSlug(dish.name)}`}>
                    {dish.name}
                  </Link>
                </h3>
                <p className="text-xs text-[#6b7280] mt-1">
                  Handcrafted with pure highland ingredients.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#eae8e1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#9ca3af] block">Price</span>
                  <span className="text-base font-black text-[#0c5836]">{dish.price} Birr</span>
                </div>

                <AddToCartButton dish={dish} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/menu"
            className="inline-block px-8 py-3 rounded-full bg-[#0c5836] hover:bg-[#084228] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all"
          >
            Browse Full Menu &rarr;
          </Link>
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-[#eae8e1] p-8 sm:p-10 shadow-xs text-center max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
            Table <span className="text-[#0c5836]">Booking &amp; Fast Dispatch</span>
          </h2>
          <p className="text-xs text-[#6b7280] mt-1">
            Reserve a dining table or order instantaneous dispatch anywhere in Addis Ababa.
          </p>
        </div>

        <form action="/checkout" className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div>
            <label htmlFor="booking-name" className="block text-[11px] font-black uppercase text-[#6b7280] mb-1">
              Your Name
            </label>
            <input
              id="booking-name"
              name="name"
              type="text"
              autoComplete="name"
              spellCheck={false}
              placeholder="e.g. Dawit Haile…"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#eae8e1] bg-[#faf9f5] text-[#111827] focus-visible:border-[#0c5836] focus-visible:ring-2 focus-visible:ring-[#0c5836]/20 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="booking-area" className="block text-[11px] font-black uppercase text-[#6b7280] mb-1">
              Delivery Area / Guests
            </label>
            <input
              id="booking-area"
              name="area"
              type="text"
              autoComplete="off"
              placeholder="e.g. Bole / 4 Guests…"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#eae8e1] bg-[#faf9f5] text-[#111827] focus-visible:border-[#0c5836] focus-visible:ring-2 focus-visible:ring-[#0c5836]/20 transition-colors"
            />
          </div>

          <div className="flex items-end">
            <Link
              href="/checkout"
              className="w-full py-2.5 px-6 rounded-xl bg-[#0c5836] hover:bg-[#084228] text-white font-extrabold text-xs text-center uppercase tracking-wider transition-colors block"
            >
              Confirm Booking &rarr;
            </Link>
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
            Happy <span className="text-[#0c5836]">Feedback</span>
          </h2>
          <p className="text-xs text-[#6b7280] mt-1">
            Real experiences from foodies enjoying Addis Eats daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-white border border-[#eae8e1] shadow-xs flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#e8f5ed] flex items-center justify-center text-xl flex-shrink-0">
              👤
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                ⭐⭐⭐⭐⭐
              </div>
              <h4 className="font-extrabold text-sm text-[#111827] mt-1">Sarah T.</h4>
              <p className="text-xs text-[#4b5563] mt-2 leading-relaxed">
                &ldquo;The Sambusa arrived crispy and hot with delicious spicy awaze dip. Authentic flavor and superb service!&rdquo;
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#eae8e1] shadow-xs flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#e8f5ed] flex items-center justify-center text-xl flex-shrink-0">
              👤
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                ⭐⭐⭐⭐⭐
              </div>
              <h4 className="font-extrabold text-sm text-[#111827] mt-1">Michael G.</h4>
              <p className="text-xs text-[#4b5563] mt-2 leading-relaxed">
                &ldquo;Steak &amp; Fries was seasoned to absolute perfection. Super fast rider delivery to Kazanchis!&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}