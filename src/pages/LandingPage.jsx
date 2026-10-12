import { useState } from "react";
import teamImage1 from "../assets/images/somaya.jpg";
import teamImage2 from "../assets/images/user.jpg";
import { Reorder, motion } from "framer-motion";
import { Link } from "react-router-dom";
import SocialMedia from "../components/social/SocialMedia";
import AnimatedIcon from "../components/AnimatedIcon";
import calender from "../assets/animations/calender.json";
import target from "../assets/animations/target.json";

export default function Landing() {
  const somayaSocila = {
    twitter: "https://x.com/SomayaAtaee",
    github: "https://github.com/somayaataee",
    linkedin: "https://www.linkedin.com/in/somaya-ataie-b55336361/",
  };

  const mahbobaSocila = {
    twitter: "",
    github: "https://github.com/MahbobaNawrozi",
    linkedin: "https://www.linkedin.com/in/mahboba-nawrozi-566392331/",
  };


  const headerCard = [
    {
      id: 1,
      title: "Your data is safe",
      rotate: 10,
    },
    {
      id: 2,
      title: "Always improving",
      rotate: 5,
    },
    {
      id: 3,
      title: "24/7 Support",
      rotate: -8,
    },
  ];

  const [cards, setCards] = useState(headerCard);

  // ================= FEATURES =================

  const cardsData2 = [
    {
      title: "Easy to Use",
      content: "Add, edit and manage tasks in just a few clicks.",
      icon: <AnimatedIcon src={calender} size={300} />,
    },
    {
      title: "Stay on Track",
      content: "Set due dates and never miss important deadlines.",
      icon: <AnimatedIcon src={target} size={300} />,
    },
    {
      title: "Track Progress",
      content: "Visualize your progress and achieve more every day.",
      icon: "📊",
    },
    {
      title: "Sync Everywhere",
      content: "Access your tasks from any device, anytime.",
      icon: "☁️",
    },
  ];

  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
      className="min-h-screen overflow-hidden"
    >
      <section className="relative -mt-10 px-6 py-20 md:px-12 lg:px-20 lg:py-28">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--primary)" }}
        />

        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--primary)" }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2 lg:gap-24">
          <div className="max-w-xl">
            <span
              style={{
                background: "var(--card)",
                borderColor: "var(--primary)",
                color: "var(--primary)",
              }}
              className="mb-6 inline-flex rounded-full border px-4 py-2 text-sm font-semibold"
            >
               Simple Task Management
            </span>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Your Tasks,
              <br />
              Your{" "}
              <span style={{ color: "var(--primary)" }}>Success</span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 opacity-70">
              TodoList helps you organize your tasks, stay focused, and get
              more done every day. Simple, beautiful and made for
              productivity.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/signup">
                <button
                  style={{
                    background: "var(--primary)",
                  }}
                  className="group rounded-2xl px-7 py-4 font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  Get Started for Free
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </Link>

              <Link
                to="/signup"
                style={{ borderColor: "var(--border)" }}
                className="rounded-2xl border px-7 py-4 font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Sign up
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm opacity-60">
              <span>✓ Free to use</span>
              <span>✓ Simple</span>
              <span>✓ Fast</span>
            </div>

            <p className="mt-4 text-sm opacity-70">
              Already have an account?{" "}
              <Link
                to="/signin"
                style={{ color: "var(--primary)" }}
                className="font-semibold hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center">
            <div
              className="absolute h-72 w-72 rounded-full opacity-10 blur-2xl"
              style={{
                background: "var(--primary)",
              }}
            />

            <Reorder.Group
              axis="y"
              values={cards}
              onReorder={setCards}
              className="relative flex w-full flex-col items-center gap-3"
            >
              {cards.map((card) => (
                <Reorder.Item
                  key={card.id}
                  value={card}
                  className="flex h-36 w-64 cursor-grab items-center justify-center rounded-3xl border p-6 text-center font-bold text-black shadow-[0_25px_60px_rgba(118,171,174,0.22)] active:cursor-grabbing md:h-40 md:w-72"
                  style={{
                    rotate: card.rotate,
                    background: "var(--primary)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                  }}
                  whileDrag={{
                    scale: 1.08,
                    zIndex: 10,
                  }}
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3 + card.id,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <div>
                    <div className="mb-2 text-3xl">
                      {card.id === 1 && "🔐"}
                      {card.id === 2 && "🚀"}
                      {card.id === 3 && "💬"}
                    </div>
                    <h2 className="text-lg md:text-xl">{card.title}</h2>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl text-center">
          <span
            style={{
              background: "var(--primary)",
            }}
            className="inline-block rounded-full px-5 py-2 text-sm font-bold text-black"
          >
            Features
          </span>

          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Everything you need to stay organized
          </h2>

          <p className="mx-auto mt-4 max-w-2xl opacity-60">
            Simple, powerful, and beautiful task management designed to help
            you accomplish more.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cardsData2.map((cardItem, index) => (
              <motion.li
                key={cardItem.title}
                style={{
                  background: "var(--card)",
                  borderColor: "var(--primary)",
                }}
                className="group text-center rounded-3xl border p-7 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
              >
                <div className="mb-6 flex h-24 w-54 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110">
                  {cardItem.icon}
                </div>

                <h3
                  style={{
                    color: "var(--primary)",
                  }}
                  className="text-lg font-bold"
                >
                  {cardItem.title}
                </h3>

                <p className="mt-3 text-sm leading-6 opacity-65">
                  {cardItem.content}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <span
            style={{
              background: "var(--primary)",
            }}
            className="inline-block rounded-full px-5 py-2 text-sm font-bold text-black"
          >
            Created With
          </span>

          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Meet Our Team
          </h2>

          <p className="mx-auto mt-4 max-w-xl opacity-60">
            The people behind TodoList.
          </p>

          <div className="mt-12 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2">
            {/* --------- MAHBOBA  */}
            <div
              style={{
                background: "var(--card)",
                borderColor: "var(--primary)",
              }}
              className="w-80 max-w-sm rounded-3xl border p-8 shadow-lg hover:shadow-2xl"
            >
              <img
                className="mx-auto h-28 w-28 rounded-full border-4 object-cover shadow-md"
                style={{
                  borderColor: "var(--primary)",
                }}
                src={teamImage2}
                alt="Mahboba Nawrozi"
              />

              <h3 className="mt-6 text-xl font-bold">Mahboba Nawrozi</h3>

              <p
                style={{
                  color: "var(--primary)",
                }}
                className="mt-2 font-medium"
              >
                Backend Developer
              </p>

              <div className="mt-5 flex justify-center">
                <SocialMedia socialLink={mahbobaSocila} />
              </div>
            </div>

            {/* ================= SOMAYA ================= */}
            <div
              style={{
                background: "var(--card)",
                borderColor: "var(--primary)",
              }}
              className="w-80 max-w-sm rounded-3xl border p-8 shadow-lg hover:shadow-2xl"
            >
              <img
                className="mx-auto h-28 w-28 rounded-full border-4 object-cover shadow-md"
                style={{
                  borderColor: "var(--primary)",
                }}
                src={teamImage1}
                alt="Somaya Ataie"
              />

              <h3 className="mt-6 text-xl font-bold">Somaya Ataie</h3>

              <p
                style={{
                  color: "var(--primary)",
                }}
                className="mt-2 font-medium"
              >
                Front-End Web Developer
              </p>

              <div className="mt-5 flex justify-center">
                <SocialMedia socialLink={somayaSocila} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------footer */}
      <footer
        style={{
          borderColor: "var(--border)",
        }}
        className="border-t px-6 py-8 text-center"
      >
        <p className="text-sm opacity-50">
          © 2026 all right reserved.
        </p>
      </footer>
    </main>
  );
}