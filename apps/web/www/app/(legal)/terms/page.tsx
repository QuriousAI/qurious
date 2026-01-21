import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME, LEGAL_CONFIG } from "@workspace/design-system/content";

export const metadata: Metadata = {
  title: `Terms of Service | ${APP_NAME}`,
  description: `Terms of Service for ${APP_NAME} - A research tool for the AI age.`,
};

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      <article className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {LEGAL_CONFIG.lastUpdated}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to {APP_NAME}. By accessing or using our services, website,
            applications, or any other products or services offered by{" "}
            {APP_NAME} (collectively, the &quot;Services&quot;), you agree to be
            bound by these Terms of Service (&quot;Terms&quot;). If you do not
            agree to these Terms, please do not use our Services.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            We reserve the right to update or modify these Terms at any time
            without prior notice. Your continued use of the Services after any
            such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            2. Description of Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {APP_NAME} is a research tool designed to help users discover,
            organize, and analyze academic papers and research content using
            AI-powered features. Our Services may include, but are not limited
            to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>AI-assisted research paper discovery and recommendations</li>
            <li>Paper organization and folder management</li>
            <li>Semantic search capabilities</li>
            <li>Research summaries and insights</li>
            <li>Collaboration features</li>
            <li>Browser extensions and mobile applications</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed">
            To access certain features of our Services, you may be required to
            create an account. You agree to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              Provide accurate, current, and complete information during
              registration
            </li>
            <li>Maintain and promptly update your account information</li>
            <li>
              Maintain the security and confidentiality of your login
              credentials
            </li>
            <li>Accept responsibility for all activities under your account</li>
            <li>
              Notify us immediately of any unauthorized use of your account
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            We reserve the right to suspend or terminate your account if any
            information provided proves to be inaccurate, not current, or
            incomplete.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree not to use the Services to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              Violate any applicable laws, regulations, or third-party rights
            </li>
            <li>
              Upload, post, or transmit any content that is unlawful, harmful,
              threatening, abusive, harassing, defamatory, or otherwise
              objectionable
            </li>
            <li>
              Impersonate any person or entity or misrepresent your affiliation
            </li>
            <li>
              Interfere with or disrupt the Services or servers/networks
              connected to the Services
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the Services
            </li>
            <li>
              Use any automated means to access the Services without our express
              permission
            </li>
            <li>
              Reverse engineer, decompile, or disassemble any portion of the
              Services
            </li>
            <li>
              Use the Services for any commercial purpose without our prior
              written consent
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            5. Academic Integrity and Responsible Use
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {APP_NAME} is designed to assist and enhance academic research, not
            to replace proper academic practices. Users are expected to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              Properly cite all sources and research papers accessed through our
              Services
            </li>
            <li>
              Use AI-generated summaries and insights as supplementary tools,
              not as substitutes for reading original research
            </li>
            <li>
              Verify all information independently before including it in
              academic work
            </li>
            <li>
              Comply with their institution's academic integrity policies and
              honor codes
            </li>
            <li>
              Not use the Services to plagiarize, fabricate data, or engage in
              academic dishonesty
            </li>
            <li>
              Respect copyright and intellectual property rights of research
              authors and publishers
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            We reserve the right to suspend or terminate accounts found to be
            facilitating academic misconduct or violations of research ethics.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            6. Intellectual Property
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The Services and their original content, features, and functionality
            are owned by {APP_NAME} and are protected by international
            copyright, trademark, patent, trade secret, and other intellectual
            property laws.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            You retain ownership of any content you submit, post, or display on
            or through the Services. By submitting content, you grant us a
            worldwide, non-exclusive, royalty-free license to use, reproduce,
            modify, and distribute such content in connection with providing the
            Services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            7. Third-Party Content and Links
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our Services may contain links to third-party websites or resources,
            including academic papers, research databases, and other external
            content. We are not responsible for the availability, accuracy, or
            content of such external resources. Your use of third-party
            resources is at your own risk and subject to their respective terms
            and conditions.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            8. AI-Generated Content Disclaimer
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {APP_NAME} uses artificial intelligence to provide research
            assistance, summaries, and recommendations. While we strive for
            accuracy, AI-generated content may contain errors, inaccuracies, or
            omissions. Users should independently verify any information
            obtained through our AI features before relying on it for academic,
            professional, or other purposes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            9. Subscription and Payments
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Some features of our Services may require a paid subscription. By
            subscribing to a paid plan, you agree to pay all applicable fees.
            Subscription fees are billed in advance on a recurring basis. You
            may cancel your subscription at any time through your account
            settings.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            We reserve the right to change our pricing at any time. Any price
            changes will be communicated to you in advance and will apply to
            subsequent billing cycles.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            10. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, {APP_NAME.toUpperCase()} AND
            ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT
            BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS,
            DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              Your access to or use of or inability to access or use the
              Services
            </li>
            <li>Any conduct or content of any third party on the Services</li>
            <li>Any content obtained from the Services</li>
            <li>
              Unauthorized access, use, or alteration of your transmissions or
              content
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            11. Disclaimer of Warranties
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE
            UNINTERRUPTED, SECURE, OR ERROR-FREE.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree to indemnify, defend, and hold harmless {APP_NAME} and its
            affiliates, officers, directors, employees, and agents from and
            against any claims, liabilities, damages, losses, costs, or
            expenses, including reasonable attorneys&apos; fees, arising out of
            or in any way connected with your access to or use of the Services
            or your violation of these Terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            13. Export Controls and Trade Compliance
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The Services, including our AI technology and software, may be
            subject to export control laws and regulations of various
            jurisdictions worldwide.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            By using our Services, you represent and warrant that:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              You are not located in, under the control of, or a national or
              resident of any country subject to international embargoes or
              trade sanctions
            </li>
            <li>
              You are not identified on any governmental list of prohibited or
              restricted parties
            </li>
            <li>
              You will not use the Services in violation of any applicable
              export control or sanctions laws
            </li>
            <li>
              You will not use the Services for any purposes prohibited by
              applicable law, including weapons development or human rights
              violations
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            We reserve the right to suspend or terminate access to users or
            regions as necessary to comply with applicable export control and
            trade laws.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">14. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your account and access to the Services
            immediately, without prior notice or liability, for any reason,
            including if you breach these Terms. Upon termination, your right to
            use the Services will immediately cease.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            15. Governing Law and Disputes
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms shall be governed by and construed in accordance with
            applicable international laws and conventions. Any disputes arising
            from these Terms or your use of the Services shall be resolved
            through good faith negotiations. If negotiations fail, disputes may
            be submitted to binding arbitration in accordance with international
            arbitration rules, or resolved in a court of competent jurisdiction
            mutually agreed upon by the parties.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">16. Severability</h2>
          <p className="text-muted-foreground leading-relaxed">
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision shall be limited or eliminated to the
            minimum extent necessary so that these Terms shall otherwise remain
            in full force and effect.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">17. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us:
          </p>
          <p className="text-muted-foreground mt-4">
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${LEGAL_CONFIG.contactEmail}`}
              className="text-primary hover:underline"
            >
              {LEGAL_CONFIG.contactEmail}
            </a>
          </p>
        </section>

        <section className="border-t border-border pt-8 mt-12">
          <p className="text-muted-foreground text-sm">
            By using {APP_NAME}, you acknowledge that you have read and
            understood these Terms of Service. For information about how we
            handle your data, please visit our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
