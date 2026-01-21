import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME, LEGAL_CONFIG } from "@workspace/design-system/content";

export const metadata: Metadata = {
  title: `Privacy Policy | ${APP_NAME}`,
  description: `Privacy Policy for ${APP_NAME} - Learn how we collect, use, and protect your data.`,
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      <article className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {LEGAL_CONFIG.lastUpdated}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            At {APP_NAME}, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our research tool platform, including our
            website, browser extensions, mobile applications, and related
            services (collectively, the &quot;Services&quot;).
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Please read this Privacy Policy carefully. By using our Services,
            you consent to the practices described in this policy. If you do not
            agree with our policies, please do not use our Services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>

          <h3 className="text-xl font-medium mt-6 mb-3">
            Information You Provide to Us
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            We collect information you voluntarily provide when using our
            Services:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              <strong>Account Information:</strong> Name, email address, and
              password when you create an account
            </li>
            <li>
              <strong>Profile Information:</strong> Academic affiliations,
              research interests, and preferences
            </li>
            <li>
              <strong>Research Data:</strong> Papers you save, folders you
              create, annotations, and notes
            </li>
            <li>
              <strong>Communication Data:</strong> Messages you send to us or
              through our support channels
            </li>
            <li>
              <strong>Payment Information:</strong> Billing details processed
              through our secure payment providers
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            Information Collected Automatically
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            When you use our Services, we automatically collect certain
            information:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              <strong>Usage Data:</strong> Features used, search queries,
              interaction patterns, and time spent
            </li>
            <li>
              <strong>Device Information:</strong> Device type, operating
              system, browser type, and unique device identifiers
            </li>
            <li>
              <strong>Log Data:</strong> IP address, access times, pages viewed,
              and referring URLs
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> Information
              collected through cookies, pixels, and similar technologies
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the information we collect for various purposes:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>To provide, maintain, and improve our Services</li>
            <li>
              To personalize your experience and deliver relevant research
              recommendations
            </li>
            <li>To process transactions and manage your account</li>
            <li>
              To communicate with you about updates, features, and support
            </li>
            <li>To analyze usage patterns and improve our AI algorithms</li>
            <li>
              To detect, prevent, and address technical issues and security
              threats
            </li>
            <li>
              To comply with legal obligations and enforce our Terms of Service
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            AI and Machine Learning
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {APP_NAME} uses artificial intelligence and machine learning to
            enhance your research experience. This includes:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>Generating paper summaries and insights</li>
            <li>Providing personalized research recommendations</li>
            <li>Powering semantic search capabilities</li>
            <li>Analyzing research trends and connections</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            We may use aggregated, anonymized data to train and improve our AI
            models. Your personal research data is not shared with third parties
            for AI training purposes without your explicit consent.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Data Sharing and Disclosure
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell your personal information. We may share your
            information in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              <strong>Service Providers:</strong> With third-party vendors who
              assist in providing our Services (e.g., cloud hosting, payment
              processing, analytics)
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to
              respond to legal process
            </li>
            <li>
              <strong>Protection of Rights:</strong> To protect the rights,
              property, or safety of {APP_NAME}, our users, or others
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger,
              acquisition, or sale of assets
            </li>
            <li>
              <strong>With Your Consent:</strong> When you have given us
              explicit permission to share your information
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational measures to
            protect your personal information, including:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and audits</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Employee training on data protection practices</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            However, no method of transmission over the Internet or electronic
            storage is 100% secure. While we strive to protect your data, we
            cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal information for as long as necessary to
            provide our Services and fulfill the purposes outlined in this
            Privacy Policy. When you delete your account, we will delete or
            anonymize your personal information within 30 days, except where
            retention is required for:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>Legal or regulatory compliance obligations</li>
            <li>Resolving disputes or enforcing agreements</li>
            <li>Preventing fraud or abuse</li>
            <li>
              Backup and disaster recovery purposes (typically retained for an
              additional 90 days)
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Your Rights and Choices
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Depending on your location, you may have certain rights regarding
            your personal information:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              <strong>Access:</strong> Request a copy of your personal data
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate data
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal data
            </li>
            <li>
              <strong>Portability:</strong> Request your data in a portable
              format
            </li>
            <li>
              <strong>Opt-out:</strong> Opt out of marketing communications
            </li>
            <li>
              <strong>Withdraw Consent:</strong> Withdraw previously given
              consent
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            To exercise these rights, please contact us at{" "}
            <a
              href={`mailto:${LEGAL_CONFIG.privacyEmail}`}
              className="text-primary hover:underline"
            >
              {LEGAL_CONFIG.privacyEmail}
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies and similar tracking technologies to enhance your
            experience. Types of cookies we use include:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
            <li>
              <strong>Essential Cookies:</strong> Required for the Services to
              function properly
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how users
              interact with our Services
            </li>
            <li>
              <strong>Preference Cookies:</strong> Remember your settings and
              preferences
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            You can manage cookie preferences through your browser settings.
            Note that disabling certain cookies may affect the functionality of
            our Services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            International Data Transfers
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Your information may be transferred to and processed in countries
            other than your own. We ensure appropriate safeguards are in place
            for such transfers, including standard contractual clauses and
            compliance with applicable data protection laws.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Children&apos;s Privacy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our Services are not directed to individuals under the age of 13. We
            do not knowingly collect personal information from children under
            13. If we become aware that we have collected such information, we
            will take steps to delete it promptly.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new Privacy Policy on
            this page and updating the &quot;Last updated&quot; date. We
            encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <div className="text-muted-foreground mt-4 space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${LEGAL_CONFIG.privacyEmail}`}
                className="text-primary hover:underline"
              >
                {LEGAL_CONFIG.privacyEmail}
              </a>
            </p>
          </div>
        </section>

        <section className="border-t border-border pt-8 mt-12">
          <p className="text-muted-foreground text-sm">
            By using {APP_NAME}, you acknowledge that you have read and
            understood this Privacy Policy. For our Terms of Service, please
            visit our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            page.
          </p>
        </section>
      </article>
    </main>
  );
}
