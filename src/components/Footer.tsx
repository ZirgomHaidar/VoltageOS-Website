import { motion } from "motion/react"
import { Link } from "react-router"
import { inView, riseInSm, stagger } from "../lib/motion"

/**
 * Footer (626:120). Every decorative element in the design is a 1px #333333
 * rule or a 3px dot, so none of its three SVG exports are imported: the two
 * verticals reuse the canonical section inset (119px / 1793px on the 1920px
 * canvas = 6.198% / 6.615%), and the divider spans exactly between them —
 * wider than the content inset, so it is a sibling rather than a border on the
 * padded content box.
 */

// ponytail: the design names no destinations, so links with no route or known
// URL in the repo are left as "#" — listed out after the component.
const columns = [
  {
    title: "Products",
    links: [
      { name: "Devices", href: "/devices" },
      { name: "Latest Builds", href: "#" },
      { name: "Downloads", href: "/devices" },
      { name: "Changelogs", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "GitHub", href: "https://github.com/VoltageOS" },
      { name: "Maintainership", href: "/maintainership" },
      { name: "Support", href: "#" },
      { name: "Announcements", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Code of Conduct", href: "#" },
      { name: "Privacy", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
]

const linkClass =
  "text-ink-muted hover:text-ink focus-visible:text-ink text-[length:var(--text-body-md)] leading-[1.2] font-normal tracking-[var(--tracking-body)] transition-colors"

/** Routes stay in-app via `Link`; absolute URLs open in a new tab. */
const FooterLink = ({ href, children }: { href: string; children: string }) =>
  href.startsWith("/") ? (
    <Link to={href} className={linkClass}>
      {children}
    </Link>
  ) : (
    <a
      href={href}
      className={linkClass}
      {...(href.startsWith("http") && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {children}
    </a>
  )

const Footer = () => {
  return (
    <footer className="bg-surface-card relative w-full">
      <div
        aria-hidden="true"
        className="border-hairline pointer-events-none absolute inset-y-0 right-[6.615%] left-[6.198%] hidden border-x sm:block"
      />

      <motion.div
        {...inView}
        variants={stagger}
        className="relative flex flex-col gap-[48px] px-6 pt-[64px] pb-[56px] sm:pr-[calc(6.615%+48px)] sm:pl-[calc(6.198%+55px)] lg:flex-row lg:justify-between lg:pt-[111px] lg:pb-[78px]"
      >
        <motion.div variants={riseInSm} className="flex max-w-[361px] flex-col">
          <p className="font-inter text-ink text-[28px] leading-[1.2] font-bold whitespace-nowrap sm:text-[36px]">
            Voltage OS
          </p>
          <p className="text-ink-muted mt-[20px] text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[18px] lg:text-[length:var(--text-body-lg)]">
            Open source Android, built around privacy, security and control.
          </p>
        </motion.div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-8 gap-y-[40px] sm:grid-cols-3 sm:gap-x-[48px] lg:gap-x-[64px]"
        >
          {columns.map((column) => (
            <motion.div key={column.title} variants={riseInSm}>
              <h2 className="text-ink text-[19px] leading-[1.2] font-bold whitespace-nowrap sm:text-[length:var(--text-body-lg)]">
                {column.title}
              </h2>

              <ul className="mt-[24px] flex flex-col gap-[22px]">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </nav>
      </motion.div>

      <div
        aria-hidden="true"
        className="border-hairline mx-6 border-t sm:mr-[6.615%] sm:ml-[6.198%]"
      />

      <div className="flex flex-col gap-[10px] px-6 pt-[32px] pb-[40px] sm:flex-row sm:items-center sm:gap-[14px] sm:pr-[calc(6.615%+48px)] sm:pl-[calc(6.198%+55px)] lg:pt-[40px] lg:pb-[51px]">
        <p className="text-ink-muted text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[length:var(--text-body-md)]">
          © {new Date().getFullYear()} VoltageOS
        </p>

        <span
          aria-hidden="true"
          className="bg-ink-muted hidden size-[3px] shrink-0 rounded-full sm:block"
        />

        <p className="text-ink-muted text-[16px] leading-[1.2] font-normal tracking-[var(--tracking-body)] sm:text-[length:var(--text-body-md)]">
          Open source Android for everyone.
        </p>
      </div>
    </footer>
  )
}

export default Footer
