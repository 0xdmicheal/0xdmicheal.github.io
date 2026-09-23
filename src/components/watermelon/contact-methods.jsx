import { IoMail, IoPaperPlane, IoLogoTwitter, IoCall } from "react-icons/io5";

const methods = [
  {
    id: "email",
    icon: <IoMail className="h-6 w-6" />,
    title: "Email",
    handle: "decentralizedmicheal@gmail.com",
    description: "The brief lands in my inbox. I read everything myself.",
    actionLabel: "Write",
    actionUrl: "mailto:decentralizedmicheal@gmail.com",
  },
  {
    id: "telegram",
    icon: <IoPaperPlane className="h-6 w-6" />,
    title: "Telegram",
    handle: "@oxdmicheal",
    description: "Fastest if the launch is already moving.",
    actionLabel: "Message",
    actionUrl: "https://t.me/oxdmicheal",
  },
  {
    id: "x",
    icon: <IoLogoTwitter className="h-6 w-6" />,
    title: "X",
    handle: "@MichealOnChain",
    description: "Work in public. DMs open for projects.",
    actionLabel: "Follow",
    actionUrl: "https://x.com/MichealOnChain",
  },
  {
    id: "phone",
    icon: <IoCall className="h-6 w-6" />,
    title: "Phone",
    handle: "+976 6610 6688",
    description: "Songinokhairkhan, Ulaanbaatar. Also +976 8918 1776.",
    actionLabel: "Call",
    actionUrl: "tel:+97666106688",
  },
];

export function ContactMethods() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {methods.map((method) => (
        <article
          key={method.id}
          className="flex h-full flex-col rounded-[2rem] bg-[#e8e0d2]/55 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)]"
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#fffaf2] text-[#141311] shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0px_0px_0px_1px_rgba(0,0,0,0.04)]">
            {method.icon}
          </div>
          <h3 className="mb-1 text-xl font-semibold text-[#141311]">{method.title}</h3>
          <p className="mb-2 break-all font-mono text-xs text-[#141311]">{method.handle}</p>
          <p className="mb-8 flex-1 text-[#3c3933]">{method.description}</p>
          <a
            href={method.actionUrl}
            className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-[#1e4bff] px-3 py-3 text-center text-base font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]"
          >
            {method.actionLabel}
          </a>
        </article>
      ))}
    </div>
  );
}
