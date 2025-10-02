import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white flex flex-col items-center justify-center px-6">
            {/* Logo / Title */}
            <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-violet-400">
                Nimbus Drive
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-10">
                Your secure and modern cloud storage. Store, manage, and access your files anywhere with style.
            </p>

            {/* CTA Button */}
            <Link
                to="/login"
                className="px-6 py-3 rounded-2xl bg-violet-500 hover:bg-violet-600 text-lg font-semibold shadow-lg transition transform hover:scale-105"
            >
                Get Started →
            </Link>

            {/* Footer */}
            <footer className="absolute bottom-6 text-sm text-gray-500">
                © {new Date().getFullYear()} Nimbus Drive. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;
