import { Link } from "react-router-dom";

const Imprint = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[var(--blue)] mb-8 font-adventure">
        Imprint (Impressum)
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Information according to § 5 TMG
        </h2>
        <p className="mb-2">
          Joanna Roy
          <br />
          Munich, Germany
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">Contact</h2>
        <p>
          Email: joannaroy6[at]gmail[dot]com
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Responsible for content according to § 55 Abs. 2 RStV
        </h2>
        <p>
          Joanna Roy
          <br />
          Munich, Germany
        </p>
      </section>

      <section className="mb-8 p-4 bg-[var(--pastel-light-blue)]/30 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Privacy (Datenschutz)
        </h2>
        <p className="mb-3">
          This website does not use cookies. I respect your privacy and keep data collection minimal.
        </p>
        <p className="mb-3">
          <strong>Analytics:</strong> With your consent, I use{" "}
          <a
            href="https://vercel.com/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--purple)]"
          >
            Vercel Analytics
          </a>
          {" "}to see anonymous statistics like page views and which posts are popular. 
          No personal data is collected or stored. You can decline this when you first visit.
        </p>
        <p className="mb-3">
          <strong>Hosting:</strong> This site is hosted on Vercel. Their servers automatically 
          log IP addresses temporarily for security purposes. See{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--purple)]"
          >
            Vercel's Privacy Policy
          </a>
          .
        </p>
        <p className="mb-3">
          <strong>Your rights under{" "}
          <a
            href="https://gdpr.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--purple)]"
          >
            GDPR
          </a>
          :</strong> You can withdraw analytics consent anytime by clearing your browser's 
          local storage. For questions about your data, email me.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Liability for Content
        </h2>
        <p className="mb-2">
          As a service provider, I am responsible for my own content on these
          pages according to § 7 Abs.1 TMG under general laws. According to §§ 8
          to 10 TMG, however, I am not obligated as a service provider to
          monitor transmitted or stored third-party information or to
          investigate circumstances that indicate illegal activity.
        </p>
        <p>
          Obligations to remove or block the use of information under general
          laws remain unaffected. However, liability in this regard is only
          possible from the point in time at which a concrete legal infringement
          becomes known. If I become aware of any such legal violations, I
          will remove this content immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Liability for Links
        </h2>
        <p className="mb-2">
          This website contains links to external websites of third parties, over
          whose contents I have no influence. Therefore, I cannot assume any
          liability for these external contents. The respective provider or
          operator of the pages is always responsible for the content of the
          linked pages.
        </p>
        <p>
          The linked pages were checked for possible legal violations at the
          time of linking. Illegal contents were not recognizable at the time of
          linking. However, permanent content control of the linked pages is not
          reasonable without concrete evidence of a legal violation. If I
          become aware of legal violations, I will remove such links
          immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">Copyright</h2>
        <p>
          The content and works on these pages are subject to German copyright law. 
          Reproduction, editing, distribution, and any kind of use beyond the limits 
          of copyright law require my written consent. Downloads and copies of this 
          site are only permitted for private, non-commercial use.
        </p>
      </section>

      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          to="/"
          className="text-[var(--purple)] hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Imprint;
