import {
  BookOpen,
  Users,
  Clock,
  ShieldCheck,
  Search,
  Smartphone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Extensive Book Collection",
    description:
      "Browse thousands of books across multiple categories including Programming, Novels, Finance, Science, History, and more.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Quickly find books using title, author, ISBN, or category with intelligent filtering.",
  },
  {
    icon: Clock,
    title: "Borrow & Return",
    description:
      "Borrow books instantly and track return dates to avoid overdue fines.",
  },
  {
    icon: Users,
    title: "Member Management",
    description:
      "Manage library members, borrowing history, and reading activity with ease.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Protected login system with JWT authentication ensuring secure access.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Access your digital library seamlessly from mobile, tablet, or desktop.",
  },
];

const LearnMore = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                Smart Library Management
              </span>

              <h1 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
                Discover a Smarter Way to
                <span className="text-yellow-300"> Manage Libraries</span>
              </h1>

              <p className="mt-6 text-lg text-gray-200">
                Our Smart Library Management System simplifies book borrowing,
                inventory management, member records, and digital access through
                a fast and user-friendly platform.
              </p>

              <button className="mt-8 flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explore Books
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="hidden lg:flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
                alt="Library"
                className="rounded-2xl shadow-2xl h-[420px] object-cover"
              />
            </div>

          </div>

        </div>
      </section>

      {/* About */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose Smart Library?
          </h2>

          <p className="text-gray-600 mt-5">
            Our platform provides everything needed for efficient library
            management—from organizing books to tracking borrowing history,
            improving user experience, and reducing manual work.
          </p>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 shadow hover:shadow-xl transition"
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Icon className="text-indigo-700" size={30} />
                </div>

                <h3 className="text-xl font-semibold mt-5">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </section>

      {/* Benefits */}

      <section className="bg-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Everything You Need in One Place
              </h2>

              <div className="mt-8 space-y-5">

                {[
                  "Easy Book Borrowing",
                  "Real-time Availability",
                  "Fast Search & Filtering",
                  "Secure User Login",
                  "Borrowing History",
                  "Modern Dashboard",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <CheckCircle className="text-green-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}

              </div>
            </div>

            <div className="bg-indigo-700 rounded-3xl p-10 text-white">

              <h3 className="text-2xl font-bold">
                Smart Library Statistics
              </h3>

              <div className="grid grid-cols-2 gap-6 mt-10">

                <div>
                  <h2 className="text-4xl font-bold">5K+</h2>
                  <p className="text-indigo-100">Books Available</p>
                </div>

                <div>
                  <h2 className="text-4xl font-bold">2K+</h2>
                  <p className="text-indigo-100">Active Members</p>
                </div>

                <div>
                  <h2 className="text-4xl font-bold">15K+</h2>
                  <p className="text-indigo-100">Books Borrowed</p>
                </div>

                <div>
                  <h2 className="text-4xl font-bold">99%</h2>
                  <p className="text-indigo-100">User Satisfaction</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white">

        <div className="max-w-5xl mx-auto px-6 py-20 text-center">

          <h2 className="text-4xl font-bold">
            Ready to Explore the Library?
          </h2>

          <p className="mt-5 text-lg text-gray-200">
            Join our Smart Library today and experience a modern, secure,
            and efficient way to borrow and manage books.
          </p>

          <button className="mt-8 bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Started
          </button>

        </div>

      </section>

    </div>
  );
};

export default LearnMore;