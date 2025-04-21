const Footer = () => {
  return (
    <footer className="hidden lg:flex absolute bottom-0 left-0 right-0 first-letter:flex-row items-center justify-center py-4 text-gray-500 text-sm opacity-40">
      <a
        href="https://fjanza.dev.ar"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-200 hover:text-white mx-2 transition-colors duration-200"
      >
        @franciscojanza
      </a>
      <p>|</p>
      <a
        href="https://marcosmonaco.dev.ar/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-200 hover:text-white mx-2 transition-colors duration-200"
      >
        @marcosmonaco
      </a>
    </footer>
  );
};

export default Footer;
