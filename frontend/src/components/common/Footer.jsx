import settings from "@/data/SiteSettings.json";
export default function Footer() {
  return (
    <footer className="border-t bg-white py-5 px-3 md:px-10 text-center">
      <p>
        &copy; {settings.user_name} {new Date().getFullYear()}
      </p>
      <p className="text-sm">
        Designed and developed by&nbsp;
        <a
          className="font-bold underline"
          href="https://www.sabinlohani.com.np"
        >
          Sabin Lohani
        </a>
      </p>
    </footer>
  );
}
