import ArrowUpIcon from './icons/ArrowUpIcon';

function ScrollToTopButton() {
  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

  return (
    <button
      title="scroll up"
      onClick={scrollToTop}
      className="fixed bottom-2 right-4 lg:right-[calc(var(--horiz-padding-big-screen)+8px)] w-10 h-14 "
    >
      <ArrowUpIcon className="fill-amber-300" />
    </button>
  );
}

export default ScrollToTopButton;
