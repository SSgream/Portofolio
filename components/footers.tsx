export default function Footer() {
  return (
    <footer className="py-8 px-8 md:px-20 bg-[#0d0d14] text-gray-400 text-center">
      <p>
        © {new Date().getFullYear()} Selwin. All rights reserved.
      </p>
    </footer>
  );
}
