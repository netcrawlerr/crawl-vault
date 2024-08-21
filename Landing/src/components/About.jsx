const About = () => {
  return (
    <section className="about mt-20 lg:mx-44 px-4 sm:px-20 py-10 bg-stone-800 text-slate-100 rounded-lg">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center mb-8">
        About Crawl Vault
      </h2>
      <p className="text-base sm:text-lg lg:text-xl mb-6">
        I created <span className="text-green-500">Crawl Vault</span> to make it
        easier to manage passwords. It keeps your passwords{" "}
        <span className="text-green-400">safe</span>, organized, and easy to
        find—
        <span>no extra thinking needed</span>.
      </p>
      <p className="text-base sm:text-lg lg:text-xl mb-6">
        You can get your passwords from{" "}
        <span className="text-green-400">anywhere</span>, anytime, using your
        Phone. Just download <span className="text-green-500">Crawl Vault</span>{" "}
        and
        <span> let it remember your passwords</span>.
      </p>
      <p className="text-base sm:text-lg lg:text-xl mb-6">
        Whether it`s for your personal accounts or something more important,
        <span className="text-green-500"> Crawl Vault</span> has got you
        covered.
      </p>
    </section>
  );
};

export default About;
