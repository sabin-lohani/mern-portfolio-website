export default function handleShare(title, text, url) {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .catch(console.error);
  }
}
