export function whatsappHref(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

export function pageAwareWhatsappMessage(pathname: string, serviceName?: string): string {
  if (serviceName) {
    return `Hi, I'm interested in ${serviceName}. I found you on your website (${pathname}).`;
  }
  return `Hi, I'd like a free consultation. I'm on ${pathname}.`;
}
