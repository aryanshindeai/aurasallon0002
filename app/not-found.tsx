import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070606] text-[#F7F4EF] p-4 text-center">
      <h2 className="text-3xl font-serif text-[#E5C158] mb-4">404 - Page Not Found</h2>
      <p className="text-stone-400 mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#E5C158] text-black text-sm font-semibold hover:bg-white transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}
