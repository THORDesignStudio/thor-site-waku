export default function HeroSpace() {
  return (
    <>
      <section>
        <img
          src="/images/hero-n44-superbubble.jpg"
          alt="n44 superbubble"
          className="w-full h-full object-cover"
        />
      </section>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
